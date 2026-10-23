# Chronicles

Deepanshi Agarwal's personal portfolio: a single-page scroll site (Next.js App Router, TypeScript, Tailwind CSS) with Home, Projects, About, and Contact as anchored sections, plus a separate detail page per project with its own query form.

**Interactive layer:**
- `src/components/hero/HeroScene.tsx` — drag-to-rotate glass 3D hero (React Three Fiber + drei: `MeshTransmissionMaterial`, a procedural lightformer environment, a particle field)
- `src/components/Navbar.tsx` — sticky nav with scroll-spy (`IntersectionObserver`) that highlights the section in view
- `src/components/PageTransition.tsx` — animated transitions between routes (Framer Motion `AnimatePresence`)
- `src/components/Reveal.tsx` — scroll-triggered fade/slide-in, used throughout
- `src/components/ProjectRow.tsx` — numbered project list rows with a continuous scroll-linked fade/scale effect
- `src/components/BackgroundGlow.tsx` / `GrainOverlay.tsx` — ambient gradient blobs and film-grain texture behind every page

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `/` — Home, with Projects/About/Contact as in-page sections (`#projects`, `#about`, `#contact`)
- `/projects/[slug]` — a standalone detail page per project (shareable URL, repo/live-demo links, its own contact form)

## Adding a project

Edit `src/data/projects.ts` and add an entry to the `projects` array:

```ts
{
  slug: "my-project",          // used in the URL: /projects/my-project
  title: "My Project",
  summary: "One-line summary shown in the project list.",
  description: "Longer description shown on the detail page.",
  techStack: ["Next.js", "Python"],
  repoUrl: "https://github.com/you/my-project",
  liveUrl: "https://my-project.vercel.app", // optional
}
```

No other code changes are needed — both the Home page's project list and each detail page are generated from this file. Also update `generateStaticParams` is not needed; it already reads from this array.

## Contact form / email setup

The contact form (in the `#contact` section and on each project detail page) posts to `src/app/api/contact/route.ts`, which sends an email via [Resend](https://resend.com).

1. Create a free Resend account and API key.
2. Copy `.env.example` to `.env.local` and fill in:
   ```
   RESEND_API_KEY=your_resend_api_key
   CONTACT_TO_EMAIL=you@example.com
   ```
3. Restart the dev server.

Without these variables set, submissions are accepted and logged to the server console instead of emailed — useful for local development.

**Note:** Resend's test sender (`onboarding@resend.dev`) only works out of the box for sending to your own verified email. To send to any address, [verify a domain](https://resend.com/domains) in Resend and update the `from` address in `src/app/api/contact/route.ts`.

## Deployment

Deploy on [Vercel](https://vercel.com/new) (recommended — same company as Next.js, zero-config). Add the `RESEND_API_KEY` and `CONTACT_TO_EMAIL` environment variables in the Vercel project settings.
