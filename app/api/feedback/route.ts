import { Resend } from "resend";

const MAX_MESSAGE_LENGTH = 5000;
const MAX_EMAIL_LENGTH = 320;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

  const { message, email, website } = body as Record<string, unknown>;

  // Honeypot: real users never fill in this hidden field.
  if (typeof website === "string" && website.trim() !== "") {
    return Response.json({ ok: true });
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return Response.json({ error: "Message is too long." }, { status: 400 });
  }

  let replyTo: string | undefined;
  if (typeof email === "string" && email.trim() !== "") {
    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email.trim())) {
      return Response.json(
        { error: "That email address doesn't look right." },
        { status: 400 },
      );
    }
    replyTo = email.trim();
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Feedback route missing RESEND_API_KEY or FEEDBACK_TO_EMAIL");
    return Response.json(
      { error: "Feedback is temporarily unavailable." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const trimmedMessage = message.trim();
  const from = process.env.FEEDBACK_FROM_EMAIL || "feedback@mail.stemsnapshots.com";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo,
    subject: "New feedback from stemsnapshots.com",
    text: `${trimmedMessage}${replyTo ? `\n\nFrom: ${replyTo}` : ""}`,
    html: `<p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br>")}</p>${
      replyTo ? `<p>From: ${escapeHtml(replyTo)}</p>` : ""
    }`,
  });

  if (error) {
    console.error("Resend error", error);
    return Response.json(
      { error: "Couldn't send feedback. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
