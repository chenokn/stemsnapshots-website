import { stripeClient } from "@/lib/stripe";

export async function POST() {
  const priceId = process.env.STRIPE_PRICE_ID;
  const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  if (!priceId) {
    console.error("Checkout route missing STRIPE_PRICE_ID");
    return Response.json(
      { error: "Checkout is temporarily unavailable." },
      { status: 500 },
    );
  }

  try {
    const stripe = stripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/account?purchase=success`,
      cancel_url: `${appUrl}/?purchase=cancelled`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return Response.json(
      { error: "Couldn't start checkout. Please try again." },
      { status: 502 },
    );
  }
}
