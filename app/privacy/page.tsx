import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — STEMSnapshots",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: 2026</p>

      <div className="mt-10 space-y-8 text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Overview
          </h2>
          <p className="mt-2">
            STEMSnapshots builds offline-first desktop applications, including
            Digital Lab. Our apps are designed to run entirely on your device
            without requiring an internet connection or collecting personal
            data during normal use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Information we collect
          </h2>
          <p className="mt-2">
            Our desktop apps do not collect, transmit, or store personal
            information. Any settings or progress are saved locally on your
            device only. If you contact us directly by email, we retain that
            correspondence to respond to your message.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            This website
          </h2>
          <p className="mt-2">
            This website uses Vercel Analytics to understand aggregate traffic
            (e.g. which pages are visited). It does not use cookies and does
            not track individual visitors across sites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Contact
          </h2>
          <p className="mt-2">
            Questions about this policy can be sent to{" "}
            <a
              href="mailto:janet.kim6013@gmail.com"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              janet.kim6013@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
