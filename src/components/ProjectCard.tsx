"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [10, -10]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-10, 10]),
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
      whileHover={{ scale: 1.03 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-black/10 p-6 transition-shadow hover:shadow-xl dark:border-white/10"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${glowX} ${glowY}, rgba(99,102,241,0.15), transparent 60%)`,
        }}
      />
      <div className="relative">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-black/70 dark:bg-white/10 dark:text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-6 flex items-center gap-4 text-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="font-medium underline underline-offset-4"
        >
          Details
        </Link>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
        >
          Repo
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            Live demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
