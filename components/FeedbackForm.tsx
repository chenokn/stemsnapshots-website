"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function FeedbackForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: data.get("message"),
          email: data.get("email"),
          website: data.get("website"), // honeypot
        }),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(body.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
        Thanks for the feedback — we read every message.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field, hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="feedback-message" className="sr-only">
          Your feedback
        </label>
        <textarea
          id="feedback-message"
          name="message"
          required
          rows={4}
          maxLength={5000}
          placeholder="What's working, what's not, what should we build next?"
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="feedback-email" className="sr-only">
            Your email (optional)
          </label>
          <input
            id="feedback-email"
            type="email"
            name="email"
            placeholder="Email (optional, if you'd like a reply)"
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send feedback"}
        </button>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </form>
  );
}
