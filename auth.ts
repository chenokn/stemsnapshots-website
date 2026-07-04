import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Resend } from "resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: { strategy: "database" },
  providers: [
    Nodemailer({
      // Unused: sendVerificationRequest below fully replaces the default
      // nodemailer transport, but the provider constructor requires this
      // field to be truthy regardless.
      server: "smtp://unused:unused@localhost:25",
      from: process.env.FEEDBACK_FROM_EMAIL || "hello@mail.stemsnapshots.com",
      async sendVerificationRequest({ identifier, url }) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          throw new Error("Missing RESEND_API_KEY");
        }
        const resend = new Resend(apiKey);
        const from =
          process.env.FEEDBACK_FROM_EMAIL || "hello@mail.stemsnapshots.com";
        const { error } = await resend.emails.send({
          from,
          to: identifier,
          subject: "Sign in to your Digital Lab account",
          text: `Sign in here: ${url}\n\nThis link expires shortly and can only be used once.`,
          html: `<p><a href="${url}">Sign in to Digital Lab</a></p><p>This link expires shortly and can only be used once.</p>`,
        });
        if (error) {
          throw new Error(`Failed to send sign-in email: ${error.message}`);
        }
      },
    }),
  ],
  pages: {
    verifyRequest: "/account/check-email",
  },
});
