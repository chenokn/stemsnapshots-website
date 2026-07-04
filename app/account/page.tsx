import { FaApple, FaWindows, FaLinux } from "react-icons/fa6";
import { auth, signIn } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase";

const RELEASE_BASE =
  "https://github.com/chenokn/DigitalLab-Releases/releases/download/v1.0.0";

const DOWNLOADS = [
  {
    label: "macOS",
    icon: FaApple,
    href: `${RELEASE_BASE}/Digital.Lab-1.0.0-arm64.dmg`,
  },
  {
    label: "Windows",
    icon: FaWindows,
    href: `${RELEASE_BASE}/Digital.Lab.Setup.1.0.0.exe`,
  },
  {
    label: "Linux",
    icon: FaLinux,
    href: `${RELEASE_BASE}/Digital.Lab-1.0.0.AppImage`,
  },
];

async function handleSignIn(formData: FormData) {
  "use server";
  await signIn("nodemailer", formData, { redirectTo: "/account" });
}

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <div className="mx-auto max-w-md px-6 py-24">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Sign in
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Enter the email you used to buy Digital Lab — we'll send you a
          sign-in link.
        </p>
        <form action={handleSignIn} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-500 dark:border-white/15 dark:bg-white/[0.03] dark:text-white"
          />
          <button
            type="submit"
            className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500"
          >
            Send sign-in link
          </button>
        </form>
      </div>
    );
  }

  const supabase = supabaseAdmin();
  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("email", session.user.email)
    .maybeSingle();

  const { data: licenses } = customer
    ? await supabase
        .from("licenses")
        .select("key, status, activated_devices, max_activations")
        .eq("customer_id", customer.id)
    : { data: null };

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        My Account
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Signed in as {session.user.email}
      </p>

      {!licenses || licenses.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No license found for this email yet. If you just purchased Digital
            Lab, the license can take a minute to appear — refresh this page
            shortly.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {licenses.map((license) => (
            <div
              key={license.key}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                License key
              </p>
              <p className="mt-2 font-mono text-lg text-slate-900 dark:text-white">
                {license.key}
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                {license.activated_devices} / {license.max_activations}{" "}
                devices activated
              </p>
            </div>
          ))}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Downloads
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {DOWNLOADS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400 dark:border-white/15 dark:text-white dark:hover:border-white/30"
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
