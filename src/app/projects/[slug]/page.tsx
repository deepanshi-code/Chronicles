import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        {project.image && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-surface-border bg-surface">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 font-mono text-xs text-muted">
          {project.techStack.join("  ·  ")}
        </p>

        <div className="mt-8 flex gap-4 text-sm font-medium">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-surface-border px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
          >
            View Repo
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-5 py-2.5 text-accent-ink transition-transform hover:scale-105"
            >
              Live Demo
            </a>
          )}
        </div>

        <p className="mt-10 whitespace-pre-line leading-relaxed text-muted">
          {project.description}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="mt-16 border-t border-surface-border pt-10">
          <h2 className="text-lg font-semibold">
            Have a question about this project?
          </h2>
          <p className="mt-1 text-sm text-muted">
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
