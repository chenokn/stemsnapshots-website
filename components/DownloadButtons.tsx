import { FaApple, FaWindows, FaLinux } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { LatestRelease } from "@/lib/githubRelease";

export default function DownloadButtons({
  release,
}: {
  release: LatestRelease | null;
}) {
  const platforms: { label: string; icon: IconType; href?: string }[] = [
    { label: "macOS", icon: FaApple, href: release?.downloads.mac },
    { label: "Windows", icon: FaWindows, href: release?.downloads.windows },
    { label: "Linux", icon: FaLinux, href: release?.downloads.linux },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {platforms.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href ?? release?.htmlUrl ?? "#"}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400 dark:border-white/15 dark:text-white dark:hover:border-white/30"
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </div>
      {release?.version && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
          Version {release.version} — free to download, unlocks fully with a
          license
        </p>
      )}
    </div>
  );
}
