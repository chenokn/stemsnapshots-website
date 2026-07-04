import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-surface-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/app.svg"
            alt="Digital Lab app icon"
            width={1024}
            height={1024}
            className="h-7 w-7 shrink-0 rounded-[22%]"
          />
          <span className="hidden text-sm font-semibold tracking-wide text-slate-900 sm:inline dark:text-white">
            STEMSnapshots
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600 sm:gap-6 dark:text-slate-400">
          <Link
            href="/#digital-lab"
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Digital Lab
          </Link>
          <Link
            href="/#feedback"
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Feedback
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Privacy
          </Link>
          <Link
            href="/account"
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            My Account
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
