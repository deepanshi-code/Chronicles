import ContactForm from "@/components/ContactForm";
import Hero3D from "@/components/hero/Hero3D";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import ScrollCue from "@/components/ScrollCue";
import { projects } from "@/data/projects";

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

export default function Home() {
  return (
    <div>
      <section
        id="home"
        className="relative mx-auto grid max-w-5xl scroll-mt-20 items-center gap-10 px-6 py-16 sm:min-h-[calc(100vh-74px)] sm:grid-cols-2"
      >
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Portfolio / 2026
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Deepanshi
            <br />
            Agarwal
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            AI &amp; ML enthusiast and B.Tech CSE student at Graphic Era
            Deemed University. I build things end to end — learning by
            building.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
            <a
              href="#projects"
              className="rounded-full bg-accent px-5 py-2.5 text-accent-ink transition-transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              className="rounded-full border border-surface-border px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
            >
              Resume
            </a>
            <a
              href="https://github.com/deepanshi-code"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-surface-border px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mx-auto">
          <Hero3D />
        </Reveal>

        <ScrollCue targetId="projects" />
      </section>

      <section
        id="projects"
        className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24"
      >
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            01 — Projects
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Projects
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Everything I&apos;ve built, with repos and live demos.
          </p>
        </Reveal>
        <div className="mt-14 border-t border-surface-border">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i + 1} />
          ))}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-3xl scroll-mt-20 px-6 py-24"
      >
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            02 — About
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            About
          </h2>
          <p className="mt-6 leading-relaxed text-muted">
            I&apos;m an AI &amp; ML enthusiast studying B.Tech Computer
            Science Engineering at Graphic Era Deemed University. I like
            building things end to end — from implementing core algorithms
            (like Huffman coding from scratch) to shipping full-stack apps
            with AI features and real deployments. Learning by building.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Skills
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-surface-border px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Education
          </h3>
          <p className="mt-4 text-foreground">
            B.Tech in Computer Science Engineering, Graphic Era Deemed
            University.
          </p>
        </Reveal>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-xl scroll-mt-20 px-6 py-24"
      >
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            03 — Contact
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Contact
          </h2>
          <p className="mt-4 text-muted">
            Have a question or want to collaborate? Send a message below.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
