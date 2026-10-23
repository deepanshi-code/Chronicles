import ContactForm from "@/components/ContactForm";
import Hero3D from "@/components/hero/Hero3D";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import ScrollCue from "@/components/ScrollCue";
import { projects } from "@/data/projects";

type SkillEntry = { name: string; match: string[] };

const skillEntries: SkillEntry[] = [
  { name: "Python", match: ["Python"] },
  { name: "JavaScript", match: ["JavaScript"] },
  { name: "React", match: ["React 19"] },
  { name: "Node.js / Express", match: ["Node.js", "Express", "Express 5"] },
  { name: "C / C++", match: ["C++", "C"] },
  { name: "MongoDB", match: ["MongoDB"] },
  { name: "Machine Learning", match: ["Gemini API"] },
  { name: "Data Analysis", match: [] },
];

function projectsForSkill(skill: SkillEntry) {
  if (skill.match.length === 0) return [];
  return projects.filter((p) =>
    p.techStack.some((tech) => skill.match.includes(tech)),
  );
}

export default function Home() {
  return (
    <div>
      <section
        id="home"
        className="relative mx-auto grid max-w-5xl scroll-mt-20 items-center gap-10 px-6 py-16 sm:min-h-[calc(100vh-74px)] sm:grid-cols-2"
      >
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-border px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to AI / ML internships
          </span>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
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
            Skills — where I&apos;ve used them
          </h3>
          <div className="mt-4 divide-y divide-surface-border border-y border-surface-border">
            {skillEntries.map((skill) => {
              const used = projectsForSkill(skill);
              return (
                <div
                  key={skill.name}
                  className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="w-44 shrink-0 text-sm font-medium">
                    {skill.name}
                  </span>
                  {used.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {used.map((project) => (
                        <a
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className="rounded-full border border-surface-border px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          {project.title}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-muted">
                      Coursework &amp; practice
                    </span>
                  )}
                </div>
              );
            })}
          </div>
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
            Let&apos;s build something.
          </h2>
          <p className="mt-4 text-muted">
            Open to AI/ML and software engineering internships, or just a
            good conversation about what you&apos;re building. Send a
            message below.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
