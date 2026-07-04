import { randomBytes } from "crypto";
import Stripe from "stripe";
import { Resend } from "resend";
import { stripeClient } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { generateLicenseKey } from "@/lib/licenseKey";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    console.error("Stripe webhook missing signature or STRIPE_WEBHOOK_SECRET");
    return Response.json({ error: "Webhook not configured." }, { status: 500 });
  }

  // Signature verification needs the raw body — do not use request.json() here.
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripeClient().webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return Response.json({ ok: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_details?.email;
  if (!email) {
    console.error("Checkout session completed with no email", session.id);
    return Response.json({ ok: true });
  }

  const supabase = supabaseAdmin();

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .upsert(
      {
        email,
        stripe_customer_id:
          typeof session.customer === "string" ? session.customer : null,
      },
      { onConflict: "email" },
    )
    .select()
    .single();

  if (customerError || !customer) {
    console.error("Failed to upsert customer", customerError);
    return Response.json({ error: "Failed to record purchase." }, { status: 500 });
  }

  const licenseKey = generateLicenseKey();
  const { data: license, error: licenseError } = await supabase
    .from("licenses")
    .insert({ customer_id: customer.id, key: licenseKey })
    .select()
    .single();

  if (licenseError || !license) {
    console.error("Failed to create license", licenseError);
    return Response.json({ error: "Failed to create license." }, { status: 500 });
  }

  // Single-use token for the deep-link email button — the plaintext key below
  // is the required fallback since digitallab:// only works if the app is
  // already installed and has registered the protocol at least once.
  const activationToken = randomBytes(24).toString("hex");
  const { error: tokenError } = await supabase
    .from("activation_tokens")
    .insert({ token: activationToken, license_id: license.id });

  if (tokenError) {
    console.error("Failed to create activation token", tokenError);
    // Not fatal — the plaintext key still works without the deep link.
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FEEDBACK_FROM_EMAIL || "hello@mail.stemsnapshots.com";
  const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  if (apiKey) {
    const resend = new Resend(apiKey);
    const deepLink = `digitallab://activate?token=${activationToken}`;
    const { error: emailError } = await resend.emails.send({
      from,
      to: email,
      subject: "Your Digital Lab license key",
      text: `Thanks for buying Digital Lab!\n\nYour license key: ${licenseKey}\n\nOpen Digital Lab, go to Settings, and activate with this key. If you're on the same computer you'll buy from, you can also click this link to activate automatically: ${deepLink}\n\nYou can also sign in any time at ${appUrl}/account to view your key and download links.`,
      html: `<p>Thanks for buying Digital Lab!</p>
        <p><strong>Your license key:</strong> <code>${licenseKey}</code></p>
        <p>Open Digital Lab, go to Settings, and activate with this key.</p>
        <p>On the same computer you're buying from? <a href="${deepLink}">Click here to activate automatically</a>.</p>
        <p>You can also <a href="${appUrl}/account">sign in any time</a> to view your key and download links.</p>`,
    });
    if (emailError) {
      console.error("Failed to send license email", emailError);
    }
  } else {
    console.error("Stripe webhook missing RESEND_API_KEY — license email not sent");
  }

  return Response.json({ ok: true });
}
