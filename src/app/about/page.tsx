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
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight">About</h1>
        <p className="mt-6 leading-relaxed text-black/80 dark:text-white/80">
          I&apos;m an AI &amp; ML enthusiast studying B.Tech Computer Science
          Engineering at Graphic Era Deemed University. I like building
          things end to end — from implementing core algorithms (like
          Huffman coding from scratch) to shipping full-stack apps with AI
          features and real deployments. Learning by building.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="mt-10 text-lg font-semibold">Skills</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              data-cursor-hover
              className="rounded-full bg-black/5 px-3 py-1 text-sm transition-transform hover:scale-110 dark:bg-white/10"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.2}>
        <h2 className="mt-10 text-lg font-semibold">Education</h2>
        <p className="mt-3 text-black/80 dark:text-white/80">
          B.Tech in Computer Science Engineering, Graphic Era Deemed
          University.
        </p>
      </Reveal>
    </div>
  );
}
