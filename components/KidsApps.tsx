import Image from "next/image";

// Our iPhone and iPad apps for primary school, alongside Digital Lab.
// `store` is the App Store link (region-neutral, so each visitor lands in
// their own country's store); leave it out until an app is released.
const APPS: {
  name: string;
  icon: string;
  tagline: string;
  points: string[];
  store?: string;
}[] = [
  {
    name: "Little Maths Dictionary",
    icon: "/images/apps/little-maths-dictionary.png",
    tagline: "Maths words for Kindergarten to Year 6, explained for children.",
    points: [
      "582 maths words, each with a picture",
      "Every word and lesson read aloud",
      "Review quizzes, stars and certificates",
      "Printable word cards",
    ],
    store: "https://apps.apple.com/app/id1603212100",
  },
  {
    name: "Little Scientist",
    icon: "/images/apps/little-scientist.png",
    tagline: "Science lessons and words for Kindergarten to Year 6.",
    points: [
      "Lessons for every year, read aloud",
      "580 science words, each with a picture",
      "Review quizzes, stars and certificates",
      "Printable worksheets",
    ],
    store: "https://apps.apple.com/app/id6814824858",
  },
  {
    name: "Little Chemist",
    icon: "/images/apps/little-chemist.png",
    tagline: "A first look at chemistry: every element and compound.",
    points: [
      "All 118 elements and 186 compounds",
      "Real photos, and every one read aloud",
      "Seven phases, from first ideas up",
      "A printable page for each element",
    ],
  },
];

export default function KidsApps() {
  return (
    <section id="kids-apps" className="border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            For younger learners
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            Apps for primary school
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            For iPhone and iPad. Free to start, with one optional purchase to
            unlock everything. No ads, no accounts and no data collected,
            and they work offline.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app) => (
            <div
              key={app.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={app.icon}
                  alt={`${app.name} app icon`}
                  width={256}
                  height={256}
                  className="h-16 w-16 shrink-0 rounded-[22%] shadow-md"
                />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {app.name}
                </h3>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                {app.tagline}
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
                {app.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                {app.store ? (
                  <a
                    href={app.store}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500"
                  >
                    Get it on the App Store
                  </a>
                ) : (
                  <span className="inline-block rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-500 dark:border-white/15 dark:text-slate-400">
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
