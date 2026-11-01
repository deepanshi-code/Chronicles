"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import BrowserFrame from "@/components/BrowserFrame";
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
  const scrollScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.96, 1, 1, 0.96]);

  // Cursor-driven 3D tilt: pointer position within the card (-0.5 to 0.5
  // on each axis) maps to a spring-smoothed rotation.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), springConfig);

  function handlePointerMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ opacity, scale: scrollScale, rotateX, rotateY, transformPerspective: 800 }}
      className="group overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.65)]"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="p-4 pb-0">
          <BrowserFrame>
            <div className="relative aspect-video overflow-hidden bg-background">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
          </BrowserFrame>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-muted">
                {String(index).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                {project.title}
              </h3>
            </div>
            {project.featured && (
              <span className="shrink-0 rounded-full border border-accent-2/40 bg-accent-2/10 px-2.5 py-1 text-xs font-medium text-accent-2">
                Flagship
              </span>
            )}
          </div>
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
