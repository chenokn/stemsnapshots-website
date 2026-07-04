export interface LatestRelease {
  version: string;
  htmlUrl: string;
  downloads: {
    mac?: string;
    windows?: string;
    linux?: string;
  };
}

const RELEASES_API =
  "https://api.github.com/repos/chenokn/DigitalLab-Releases/releases/latest";
const RELEASES_PAGE = "https://github.com/chenokn/DigitalLab-Releases/releases/latest";

// Cached for an hour — no need to hit GitHub's API on every page request,
// and a new release doesn't need to appear on the site instantly.
export async function getLatestRelease(): Promise<LatestRelease | null> {
  try {
    const res = await fetch(RELEASES_API, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const assets: { name: string; browser_download_url: string }[] =
      data.assets ?? [];

    const find = (suffix: string) =>
      assets.find((a) => a.name.toLowerCase().endsWith(suffix))
        ?.browser_download_url;

    return {
      version: (data.tag_name as string)?.replace(/^v/, "") ?? "",
      htmlUrl: data.html_url ?? RELEASES_PAGE,
      downloads: {
        mac: find(".dmg"),
        windows: find(".exe"),
        linux: find(".appimage"),
      },
    };
  } catch {
    return null;
  }
}
