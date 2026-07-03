import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STEMSnapshots — Educational tools for curious minds",
  description:
    "STEMSnapshots builds offline-first educational desktop apps, starting with Digital Lab — an interactive periodic table for exploring all 118 elements.",
  metadataBase: new URL("https://stemsnapshots.com"),
  openGraph: {
    title: "STEMSnapshots",
    description:
      "Educational desktop apps for curious minds, starting with Digital Lab — an interactive periodic table.",
    url: "https://stemsnapshots.com",
    siteName: "STEMSnapshots",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-700 dark:bg-surface-950 dark:text-slate-200">
        <script
          // Runs before hydration to avoid a flash of the wrong theme for
          // returning visitors. Default is light — we only ever opt into
          // dark via a stored preference, never system `prefers-color-scheme`.
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
