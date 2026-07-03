import type { Metadata } from "next";
import Link from "next/link";

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
            Information we collect from the app
          </h2>
          <p className="mt-2">
            Digital Lab does not require an account, an internet connection,
            or sign-in of any kind. It does not collect, transmit, or store
            personal information on any server. Everything the app remembers
            about your use of it — your discovered-elements progress, lesson
            completion, view preferences, and other settings — is saved in a
            local file on your own device and never leaves it. Uninstalling
            the app removes this data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            The books (PDF export)
          </h2>
          <p className="mt-2">
            Digital Lab can generate two printable books from inside the
            app — the Wonder Table (all 118 elements) and Compound Recipes
            (186 compounds) — each saved as a PDF on your device. Nothing is
            uploaded or transmitted to produce them, and we have no
            visibility into whether or how you use this feature.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            This website
          </h2>
          <p className="mt-2">
            This website uses Vercel Analytics to understand aggregate
            traffic (e.g. which pages are visited and roughly how many
            people visit). It does not use cookies, does not use tracking
            pixels, and does not build a profile of individual visitors.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Feedback
          </h2>
          <p className="mt-2">
            The feedback form on this site sends your message — and your
            email address, if you choose to provide one for a reply — directly
            to us via a transactional email provider (Resend). We don&rsquo;t
            store submissions in a database; the message simply arrives in our
            inbox like any other email. We use it only to read and respond to
            your feedback, and we don&rsquo;t add you to any mailing list.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Newsletter sign-up
          </h2>
          <p className="mt-2">
            If you enter your email in the &ldquo;notify me&rdquo; box on
            this site, we store that address with Resend (the same provider
            that delivers our feedback emails) so we can send you launch
            updates. This is a separate, explicit opt-in from the feedback
            form — submitting feedback does not sign you up for anything, and
            signing up for updates does not add you to any other list. Every
            email we send includes an unsubscribe link, and you can ask us to
            delete your address at any time through the{" "}
            <Link
              href="/#feedback"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              feedback form
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Third-party services
          </h2>
          <p className="mt-2">
            We rely on a small number of service providers to run this
            website and app, and each only sees what it needs to do its job:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Vercel
              </span>{" "}
              — hosts this website and provides aggregate traffic analytics.
            </li>
            <li>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Resend
              </span>{" "}
              — delivers messages submitted through the feedback form to our
              inbox, and stores email addresses from the newsletter sign-up
              so we can send launch updates.
            </li>
          </ul>
          <p className="mt-2">
            We don&rsquo;t sell personal information, and we don&rsquo;t
            share it with anyone for advertising purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Children&rsquo;s privacy
          </h2>
          <p className="mt-2">
            Digital Lab is built with students in mind, including middle and
            high school classrooms. Because the app collects no personal
            information from anyone — regardless of age — there is nothing
            for us to gather, store, or share about a child using the app.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Changes to this policy
          </h2>
          <p className="mt-2">
            If this policy changes, we&rsquo;ll update this page and revise
            the date below. Since the app itself doesn&rsquo;t phone home,
            the most current version always lives here on the website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Contact
          </h2>
          <p className="mt-2">
            Questions about this policy can be sent through the{" "}
            <Link
              href="/#feedback"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              feedback form
            </Link>{" "}
            on our homepage. See also our{" "}
            <Link
              href="/terms"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
