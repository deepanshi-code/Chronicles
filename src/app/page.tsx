import Link from "next/link";
import Hero3D from "@/components/hero/Hero3D";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import ScrollCue from "@/components/ScrollCue";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      <section className="relative mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 sm:min-h-[calc(100vh-74px)] sm:grid-cols-2">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Portfolio / 2026
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Deepanshi
            <br />
            Agarwal
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            AI &amp; ML enthusiast and B.Tech CSE student at Graphic Era
            Deemed University. I build things end to end — learning by
            building.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
            <Link
              href="/projects"
              data-cursor-hover
              className="rounded-full bg-accent px-5 py-2.5 text-accent-ink transition-transform hover:scale-105"
            >
              View Projects
            </Link>
            <a
              href="/resume.pdf"
              data-cursor-hover
              className="rounded-full border border-surface-border px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
            >
              Resume
            </a>
            <a
              href="https://github.com/deepanshi-code"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="rounded-full border border-surface-border px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mx-auto">
          <Hero3D />
        </Reveal>

        <ScrollCue />
      </section>

      <div className="mx-auto max-w-5xl px-6">
        {featured.length > 0 && (
          <section className="border-t border-surface-border py-24">
            <Reveal className="flex items-baseline justify-between">
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                01 — Featured Work
              </h2>
              <Link
                href="/projects"
                data-cursor-hover
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                View all →
              </Link>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.1}>
                  <ProjectCard project={project} index={i + 1} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
