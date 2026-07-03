import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — STEMSnapshots",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: 2026</p>

      <div className="mt-10 space-y-8 text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Agreement
          </h2>
          <p className="mt-2">
            These terms cover your use of STEMSnapshots software (including
            Digital Lab), any PDF or reference guide it generates, and this
            website. By installing the app, generating a PDF from it, or
            using this site, you agree to these terms. If you don&rsquo;t
            agree, please don&rsquo;t use them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            The software
          </h2>
          <p className="mt-2">
            Digital Lab is licensed to you, not sold. We grant you a
            personal, non-exclusive, non-transferable license to install and
            use the app on devices you own or control, for personal,
            educational, or classroom use. You may not reverse engineer,
            decompile, resell, sublicense, or redistribute the app or its
            underlying code, image, or audio assets. We may release updates;
            some features may change or be removed between versions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            PDF exports &amp; the books
          </h2>
          <p className="mt-2">
            Digital Lab can generate two printable references from inside
            the app: the{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Wonder Table
            </span>{" "}
            (a complete reference guide to all 118 elements) and{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Compound Recipes
            </span>{" "}
            (a study guide covering 186 compounds) — each exported as a PDF
            saved to your device. You&rsquo;re welcome to print and use these
            for personal study or in a classroom you teach. The content,
            layout, artwork, and data compiled in these books remain the
            property of STEMSnapshots; you may not sell them, republish them
            (in print or online), or distribute them outside your own
            classroom or household without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            This website
          </h2>
          <p className="mt-2">
            You&rsquo;re welcome to browse this site and use the feedback and
            newsletter sign-up forms as intended. Please don&rsquo;t attempt
            to disrupt the site, scrape it at scale, submit spam or malicious
            content through the forms, or use it in any way that violates
            applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Intellectual property
          </h2>
          <p className="mt-2">
            The STEMSnapshots and Digital Lab names, logos, app design,
            illustrations, audio, and website content are owned by
            STEMSnapshots (or licensed to us) and protected by copyright and
            trademark law. Nothing in these terms transfers ownership of any
            of it to you — you&rsquo;re receiving a license to use it under
            the terms above, not a purchase of the underlying work.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            No warranty
          </h2>
          <p className="mt-2">
            The app, its PDF exports, and this website are provided
            &ldquo;as is,&rdquo; without warranties of any kind. While we
            aim for accuracy in the chemistry and element data we present,
            we don&rsquo;t guarantee the software or its content is error-free,
            uninterrupted, or fit for any particular purpose — including
            exam preparation or laboratory safety decisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Limitation of liability
          </h2>
          <p className="mt-2">
            To the fullest extent permitted by law, STEMSnapshots isn&rsquo;t
            liable for any indirect, incidental, or consequential damages
            arising from your use of the app, its PDF exports, or this
            website. Our total liability for any claim related to these
            terms won&rsquo;t exceed the amount you paid us, if any, for the
            software.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Changes to these terms
          </h2>
          <p className="mt-2">
            We may update these terms as the product changes. If we do,
            we&rsquo;ll revise the date at the top of this page. Continuing
            to use the app or this site after an update means you accept the
            revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Contact
          </h2>
          <p className="mt-2">
            Questions about these terms can be sent through the{" "}
            <Link
              href="/#feedback"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              feedback form
            </Link>{" "}
            on our homepage. See also our{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
