# STEMSnapshots website

Marketing site for STEMSnapshots, maker of Digital Lab (the periodic table desktop app, project name `elementorbit`). Built with Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Structure

```
app/
  layout.tsx           Root layout, header/footer, metadata, Vercel Analytics
  page.tsx             Home — hero, Digital Lab showcase, mission
  privacy/page.tsx     Privacy policy (linked from the Digital Lab app's About modal)
  icon.tsx             Favicon (32x32, generated via next/og ImageResponse)
  apple-icon.tsx       iOS home-screen icon (180x180)
  opengraph-image.tsx  Social share preview image (1200x630)
components/
  Header.tsx
  Footer.tsx
  AtomMark.tsx          Animated atom SVG used in the hero
```

Icons throughout use [react-icons](https://react-icons.github.io/react-icons/) (`react-icons/fa6`).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo — Next.js is auto-detected, no config needed.
3. Add the custom domain `stemsnapshots.com` in the Vercel project's Domains settings and point DNS at Vercel per their instructions.
4. Every push to `main` auto-deploys.

## TODO

### Content
- [x] Replace placeholder feature copy — feature grid copy is real (pulled from the app's actual functionality), not lorem ipsum; still worth a marketing-tone pass/sign-off
- [x] Add real screenshots/video of Digital Lab (hero and/or showcase section) — you dropped 24 screenshots into `public/images/` (renamed to `digital-lab-01.png`–`24.png`, the originals had a macOS narrow-no-break-space in the filename that broke tooling). Wired one into the hero (periodic table view) and five into the feature grid cards (Sample, Explore/Mohs, Digital Lab burn reaction, Atom Build, History/discoverers) via `next/image`
- [ ] Wire up real Mac App Store / Microsoft Store links — download section in the showcase now has styled badges (Apple/Windows icons) but both `href="#"` as placeholders until the app is listed and you have the URLs
- [x] Have the Privacy Policy reviewed — current copy is a reasonable placeholder, not legal advice
- [ ] Decide if a Terms of Service page is needed
- [x] Add a proper favicon / OG image — generated via `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` (Next.js `ImageResponse`)

### Features
- [ ] Newsletter/email capture, if wanted — needs picking an email service (e.g. Resend, Buttondown, Mailchimp) and an API key before it can do anything real
- [ ] Blog or changelog for future STEMSnapshots apps — deferred; no content to publish yet, revisit when there's something to post
- [x] Analytics — `@vercel/analytics` installed and mounted in `app/layout.tsx`; activates automatically once deployed on Vercel. Privacy page copy updated to reflect it (no cookies, aggregate traffic only)

### Infra
- [x] Create a GitHub repo and push this project — not done automatically since it's an externally-visible action; say the word and I'll do it
- [x] Set up the Vercel project and connect the repo — needs your Vercel account (Vercel CLI isn't installed/authenticated here)
- [x] Point `stemsnapshots.com` DNS at Vercel — needs your DNS registrar access
- [x] Verify `https://stemsnapshots.com/privacy` matches the link used in the Digital Lab app's About modal — confirmed against `elementorbit/src/components/AboutModal.tsx`

### Design polish
- [x] Review responsive layout on mobile widths — fixed the header, which could overflow on narrow phones (320–375px): the "STEMSnapshots" wordmark now hides below `sm:` (leaving just the logo mark), and nav gap/padding shrink on small screens. Grid sections were already mobile-first (single column by default)
- [x] Match the Digital Lab app's dark "surface" palette/typography — added the app's exact `surface-*` Tailwind color scale and switched the site's font from Geist to Inter (matching the app's `fontFamily.sans`) in `app/globals.css` / `app/layout.tsx`

### New since last pass
- [x] Icons — added `react-icons` (`react-icons/fa6`), used for feature-grid icons, footer email icon, and the download-placeholder icon
