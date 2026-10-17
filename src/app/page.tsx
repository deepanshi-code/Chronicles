import Link from "next/link";
import Hero3D from "@/components/hero/Hero3D";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="grid items-center gap-10 sm:grid-cols-2">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I&apos;m Deepanshi Agarwal.
          </h1>
          <p className="mt-4 max-w-md text-lg text-black/70 dark:text-white/70">
            AI &amp; ML enthusiast and B.Tech CSE student at Graphic Era
            Deemed University — Python, data analysis, and machine learning.
            Learning by building.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
            <Link
              href="/projects"
              data-cursor-hover
              className="rounded-lg bg-black px-4 py-2 text-white transition-transform hover:scale-105 dark:bg-white dark:text-black"
            >
              View Projects
            </Link>
            <a
              href="/resume.pdf"
              data-cursor-hover
              className="rounded-lg border border-black/15 px-4 py-2 transition-transform hover:scale-105 dark:border-white/15"
            >
              Resume
            </a>
            <a
              href="https://github.com/deepanshi-code"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="rounded-lg border border-black/15 px-4 py-2 transition-transform hover:scale-105 dark:border-white/15"
            >
              GitHub
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mx-auto">
          <Hero3D />
        </Reveal>
      </section>

      {featured.length > 0 && (
        <section className="mt-28">
          <Reveal>
            <h2 className="text-xl font-semibold">Featured Projects</h2>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
