"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [8, -8]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-8, 8]),
    springConfig,
  );
  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set((event.clientX - bounds.left) / bounds.width);
    mouseY.set((event.clientY - bounds.top) / bounds.height);
  }

  function handlePointerLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      data-cursor-hover
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-surface-border bg-surface p-6 transition-colors hover:border-accent/40"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${glowX} ${glowY}, rgba(198,255,61,0.12), transparent 60%)`,
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          {index !== undefined && (
            <span className="font-mono text-xs text-muted">
              {String(index).padStart(2, "0")}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-surface-border px-2.5 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-6 flex items-center gap-4 text-sm">
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
