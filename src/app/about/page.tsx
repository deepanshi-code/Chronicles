import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Deepanshi Agarwal",
};

const skills = [
  "Python",
  "JavaScript",
  "React",
  "Node.js / Express",
  "C / C++",
  "MongoDB",
  "Machine Learning",
  "Data Analysis",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          02 — About
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          About
        </h1>
        <p className="mt-6 leading-relaxed text-muted">
          I&apos;m an AI &amp; ML enthusiast studying B.Tech Computer Science
          Engineering at Graphic Era Deemed University. I like building
          things end to end — from implementing core algorithms (like
          Huffman coding from scratch) to shipping full-stack apps with AI
          features and real deployments. Learning by building.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="mt-14 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Skills
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              data-cursor-hover
              className="rounded-full border border-surface-border px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.2}>
        <h2 className="mt-14 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Education
        </h2>
        <p className="mt-4 text-foreground">
          B.Tech in Computer Science Engineering, Graphic Era Deemed
          University.
        </p>
      </Reveal>
    </div>
  );
}
