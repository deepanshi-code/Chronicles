"use client";

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
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.94, 1, 1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [24, 0, 0, -24]);

  return (
    <motion.div ref={ref} style={{ opacity, scale, y }}>
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block"
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-0 bg-accent/5"
          initial={false}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="relative flex flex-col gap-3 border-b border-surface-border py-8 transition-colors sm:flex-row sm:items-center sm:gap-8 sm:py-10">
          <span className="font-mono text-sm text-muted">
            {String(index).padStart(2, "0")}
          </span>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted">
              {project.summary}
            </p>
            <p className="mt-3 font-mono text-xs text-muted">
              {project.techStack.join("  ·  ")}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">
            View project
            <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
