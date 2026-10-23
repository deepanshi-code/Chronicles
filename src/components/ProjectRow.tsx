"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 55%", "end 45%", "end 5%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.96, 1, 1, 0.96]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="group overflow-hidden rounded-2xl border border-surface-border bg-surface transition-colors hover:border-accent/40"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden border-b border-surface-border bg-background">
          {project.image && (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 font-mono text-xs text-muted backdrop-blur-sm">
            {String(index).padStart(2, "0")}
          </span>
          {project.featured && (
            <span className="absolute right-3 top-3 rounded-full border border-accent/40 bg-background/80 px-2.5 py-1 text-xs font-medium text-accent backdrop-blur-sm">
              Flagship
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{project.summary}</p>
          <p className="mt-3 font-mono text-xs text-muted">
            {project.techStack.join("  ·  ")}
          </p>
        </div>
      </Link>
      <div className="flex items-center gap-4 px-6 pb-6 text-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Details
        </Link>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground"
        >
          Repo
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground"
          >
            Live demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
