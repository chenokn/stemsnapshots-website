import Image from "next/image";
import {
  FaWifi,
  FaCompass,
  FaFlask,
  FaAtom,
  FaHeadphones,
  FaClockRotateLeft,
  FaApple,
  FaWindows,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import ClickableScreenshot from "@/components/ClickableScreenshot";
import FeedbackForm from "@/components/FeedbackForm";

const FEATURES: {
  title: string;
  body: string;
  icon: IconType;
  image?: string;
}[] = [
  {
    title: "All 118 elements, offline",
    body: "Every element bundled locally with images, audio, and discovery history — no internet connection required.",
    icon: FaWifi,
    image: "/images/digital-lab-06.png",
  },
  {
    title: "Eight ways to explore",
    body: "Switch between atom symbols, uses, name origins, discoverers, samples, atom structures, discovery countries, and videos.",
    icon: FaCompass,
    image: "/images/digital-lab-07.png",
  },
  {
    title: "Interactive chemistry lab",
    body: "Drag elements together to form real compounds and see how bonding actually works.",
    icon: FaFlask,
    image: "/images/digital-lab-10.png",
  },
  {
    title: "Build your own atom",
    body: "Add protons, neutrons, and electrons by hand and watch stability and isotopes update live.",
    icon: FaAtom,
    image: "/images/digital-lab-15.png",
  },
  {
    title: "Narrated lessons",
    body: "Step-by-step audio lessons walk through each element's structure and story.",
    icon: FaHeadphones,
    image: "/images/digital-lab-09.png",
  },
  {
    title: "Meet the discoverers",
    body: "See who discovered each element and when, brought to life with character art and short bios.",
    icon: FaClockRotateLeft,
    image: "/images/digital-lab-05.png",
  },
];

const GALLERY: { title: string; image: string }[] = [
  { title: "Color-coded by category", image: "/images/digital-lab-02.png" },
  { title: "Real-world uses", image: "/images/digital-lab-03.png" },
  { title: "Origin of every name", image: "/images/digital-lab-04.png" },
  { title: "Where it was discovered", image: "/images/digital-lab-08.png" },
  {
    title: "186 real compounds, with hazards",
    image: "/images/digital-lab-11.png",
  },
  {
    title: "Explore molecular structures",
    image: "/images/digital-lab-12.png",
  },
  { title: "Lewis dot diagrams", image: "/images/digital-lab-13.png" },
  { title: "Common oxidation states", image: "/images/digital-lab-14.png" },
  { title: "A timeline of discovery", image: "/images/digital-lab-16.png" },
  { title: "Compare atomic mass", image: "/images/digital-lab-17.png" },
  { title: "Abundance in Earth's crust", image: "/images/digital-lab-18.png" },
  { title: "Sort by hardness", image: "/images/digital-lab-19.png" },
  { title: "Sort by density", image: "/images/digital-lab-20.png" },
  { title: "Compare melting points", image: "/images/digital-lab-21.png" },
  { title: "Compare boiling points", image: "/images/digital-lab-22.png" },
  { title: "Flammability ratings", image: "/images/digital-lab-23.png" },
  { title: "Toxicity ratings", image: "/images/digital-lab-24.png" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-20 sm:py-28 lg:flex-row lg:justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              STEMSnapshots
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl dark:text-white">
              Educational apps for curious minds
            </h1>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
              We build offline-first desktop apps that make science tangible.
              Our first release, Digital Lab, turns the periodic table into an
              interactive chemistry lab.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="#digital-lab"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500"
              >
                Explore Digital Lab
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-white/15 dark:text-slate-200 dark:hover:border-white/30 dark:hover:text-white"
              >
                Get in touch
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-md shrink-0 sm:max-w-lg lg:w-120">
            <div className="absolute -inset-8 -z-10 rounded-4xl bg-linear-to-br from-cyan-500/20 to-blue-600/20 blur-3xl" />
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface-100 shadow-2xl dark:border-white/10 dark:bg-surface-900">
              <Image
                src="/images/digital-lab-01.png"
                alt="Digital Lab's periodic table, showing all 118 elements with images and color-coded categories"
                width={3104}
                height={2024}
                sizes="(min-width: 1024px) 480px, (min-width: 640px) 512px, 384px"
                preload
                className="h-auto w-full"
              />
            </div>
            <Image
              src="/app.svg"
              alt="Digital Lab app icon"
              width={1024}
              height={1024}
              className="absolute -bottom-6 -right-6 h-16 w-16 rounded-[22%] shadow-lg sm:h-20 sm:w-20"
            />
          </div>
        </div>
      </section>

      {/* Digital Lab showcase */}
      <section
        id="digital-lab"
        className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Our app
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              Digital Lab
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              A Periodic Table App for Curious Minds. Explore all 118 elements
              with rich visuals, pronunciations, and discovery history —
              entirely offline, on macOS, Windows, or Linux.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]"
              >
                {f.image && (
                  <ClickableScreenshot
                    src={f.image}
                    title={f.title}
                    body={f.body}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="border-b border-slate-200 dark:border-white/10"
                  />
                )}
                <div className="p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-600/20 text-cyan-600 dark:text-cyan-300">
                    <f.icon size={16} />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              So much more to explore
            </p>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              A sample of the dozens of ways Digital Lab lets you slice,
              compare, and explore the periodic table.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {GALLERY.map((g) => (
                <div
                  key={g.title}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <ClickableScreenshot
                    src={g.image}
                    title={g.title}
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  />
                  <p className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {g.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <div
              aria-disabled="true"
              className="relative flex cursor-not-allowed items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 opacity-70 dark:border-white/15 dark:bg-white/[0.03]"
            >
              <span className="absolute -top-2.5 -right-2.5 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-cyan-500 dark:text-slate-950">
                Coming soon
              </span>
              <FaApple className="shrink-0 text-slate-900 dark:text-white" size={24} />
              <span className="text-left leading-tight">
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  Download on the
                </span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                  Mac App Store
                </span>
              </span>
            </div>
            <div
              aria-disabled="true"
              className="relative flex cursor-not-allowed items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 opacity-70 dark:border-white/15 dark:bg-white/[0.03]"
            >
              <span className="absolute -top-2.5 -right-2.5 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-cyan-500 dark:text-slate-950">
                Coming soon
              </span>
              <FaWindows className="shrink-0 text-slate-900 dark:text-white" size={22} />
              <span className="text-left leading-tight">
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  Get it from
                </span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                  Microsoft Store
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Digital Lab */}
      <section className="border-t border-slate-200 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Why Digital Lab
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              No other periodic table app combines fully offline delivery,
              narrated lessons, live atom animation, and real photography for
              every element in one place.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 text-center sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                No subscription
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Buy once, use everywhere — no recurring fees.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                No ads
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                A distraction-free study and teaching tool.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                No account required
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Zero data collection, zero tracking. Just install and go.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                118
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Elements, fully offline
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                600+
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Curated images
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                186
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Real compounds in the lab
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                11
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Ways to compare elements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="border-t border-slate-200 dark:border-white/10">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Feedback
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
            Help us build a better Digital Lab
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Bug reports, feature requests, or just a note — we read
            everything.
          </p>
          <div className="mt-8">
            <FeedbackForm />
          </div>
        </div>
      </section>
    </>
  );
}
