import Link from "next/link";
import { FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            STEMSnapshots
          </p>
          <p className="mt-1 text-xs text-slate-500">
            © {new Date().getFullYear()} STEMSnapshots. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a
            href="mailto:janet.kim6013@gmail.com?subject=STEMSnapshots"
            className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <FaEnvelope size={13} />
            janet.kim6013@gmail.com
          </a>
          <Link
            href="/privacy"
            className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
