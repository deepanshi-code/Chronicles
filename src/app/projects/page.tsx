import type { Metadata } from "next";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Deepanshi Agarwal",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Index
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Everything I&apos;ve built, with repos and live demos.
        </p>
      </Reveal>

      <div className="mt-14 border-t border-surface-border">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
