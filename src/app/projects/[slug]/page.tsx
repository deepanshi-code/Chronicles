import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { getProjectBySlug, projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return {
    title: project ? `${project.title} — Deepanshi Agarwal` : "Project not found",
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-black/70 dark:bg-white/10 dark:text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-4 text-sm font-medium">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="rounded-lg border border-black/15 px-4 py-2 transition-transform hover:scale-105 dark:border-white/15"
          >
            View Repo
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="rounded-lg bg-black px-4 py-2 text-white transition-transform hover:scale-105 dark:bg-white dark:text-black"
            >
              Live Demo
            </a>
          )}
        </div>

        <p className="mt-8 whitespace-pre-line leading-relaxed text-black/80 dark:text-white/80">
          {project.description}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">
          <h2 className="text-lg font-semibold">
            Have a question about this project?
          </h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Send a query directly and I&apos;ll get back to you.
          </p>
          <div className="mt-6 max-w-md">
            <ContactForm projectSlug={project.slug} />
          </div>
        </section>
      </Reveal>
    </div>
  );
}
