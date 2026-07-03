import { Resend } from "resend";

const MAX_EMAIL_LENGTH = 320;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, website } = body as Record<string, unknown>;

  // Honeypot: real users never fill in this hidden field.
  if (typeof website === "string" && website.trim() !== "") {
    return Response.json({ ok: true });
  }

  if (
    typeof email !== "string" ||
    email.trim().length === 0 ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_RE.test(email.trim())
  ) {
    return Response.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  if (!apiKey || !segmentId) {
    console.error(
      "Newsletter route missing RESEND_API_KEY or RESEND_NEWSLETTER_SEGMENT_ID",
    );
    return Response.json(
      { error: "Sign-up is temporarily unavailable." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    email: email.trim(),
    unsubscribed: false,
    segments: [{ id: segmentId }],
  });

  if (error) {
    console.error("Resend contacts.create error", error);
    return Response.json(
      { error: "Couldn't sign you up. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
