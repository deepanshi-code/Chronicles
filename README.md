# Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS. Lists projects with repo/live-demo links, project detail pages with a per-project query form, an about section, and a general contact form backed by a custom API route.

**Interactive layer:**
- `src/components/hero/HeroScene.tsx` — 3D distorted-blob hero (React Three Fiber + drei), reacts to pointer position
- `src/components/CustomCursor.tsx` — custom cursor, enlarges over links/buttons/`[data-cursor-hover]` elements (fine-pointer devices only)
- `src/components/PageTransition.tsx` — animated route transitions (Framer Motion `AnimatePresence`)
- `src/components/Reveal.tsx` — scroll-triggered fade/slide-in, used across all pages
- `src/components/ProjectCard.tsx` — 3D tilt-on-hover project cards with a cursor-following glow
- `src/components/BackgroundGlow.tsx` — ambient animated gradient blobs behind every page

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a project

Edit `src/data/projects.ts` and add an entry to the `projects` array:

```ts
{
  slug: "my-project",          // used in the URL: /projects/my-project
  title: "My Project",
  summary: "One-line summary shown on the project card.",
  description: "Longer description shown on the detail page.",
  techStack: ["Next.js", "Python"],
  repoUrl: "https://github.com/you/my-project",
  liveUrl: "https://my-project.vercel.app", // optional
  featured: true,               // optional: shows it on the home page
}
```

No other code changes are needed — the projects list, grid, and detail pages are all generated from this file.

## Contact form / email setup

The contact form (general `/contact` page and the per-project query form) posts to `src/app/api/contact/route.ts`, which sends an email via [Resend](https://resend.com).

1. Create a free Resend account and API key.
2. Copy `.env.example` to `.env.local` and fill in:
   ```
   RESEND_API_KEY=your_resend_api_key
   CONTACT_TO_EMAIL=you@example.com
   ```
3. Restart the dev server.

Without these variables set, submissions are accepted and logged to the server console instead of emailed — useful for local development.

**Note:** Resend's test sender (`onboarding@resend.dev`) only works out of the box for sending to your own verified email. To send to any address, [verify a domain](https://resend.com/domains) in Resend and update the `from` address in `src/app/api/contact/route.ts`.

## Remaining content to fill in

- `src/components/Navbar.tsx` / `Footer.tsx` — replace "Your Name"
- `src/app/page.tsx` — hero tagline, GitHub link, resume link (add `public/resume.pdf`)
- `src/app/about/page.tsx` — real bio, skills, education
- `src/data/projects.ts` — your real projects

## Deployment

Deploy on [Vercel](https://vercel.com/new) (recommended — same company as Next.js, zero-config). Add the `RESEND_API_KEY` and `CONTACT_TO_EMAIL` environment variables in the Vercel project settings.
