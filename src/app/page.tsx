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
              className="rounded-full bg-accent px-5 py-2.5 text-accent-ink shadow-[0_8px_24px_-6px_rgba(255,45,110,0.45)] transition-transform hover:scale-105"
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
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i + 1} />
          ))}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto grid max-w-5xl scroll-mt-20 gap-12 px-6 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16"
      >
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
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

          <dl className="mt-8 divide-y divide-surface-border rounded-2xl border border-surface-border bg-surface px-5">
            {[
              ["Focus", "Full-stack web apps & applied AI/ML"],
              ["Primary stack", "Python · JavaScript · React · Node.js"],
              ["Education", "Graphic Era Deemed University, B.Tech CSE"],
              ["Status", "Open to AI/ML internships"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-6"
              >
                <dt className="w-36 shrink-0 font-mono text-xs uppercase tracking-wider text-muted">
                  {label}
                </dt>
                <dd className="text-sm text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
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

          <Reveal delay={0.1}>
            <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Timeline
            </h3>
            <div className="mt-4 space-y-6 border-l border-surface-border pl-6">
              <div className="relative">
                <span className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full border border-muted" />
                <p className="font-mono text-xs text-muted">Jul 2026</p>
                <p className="mt-1 text-sm text-foreground">
                  Two internships: AI-Assisted Full Stack Web Development
                  Intern at the Technology Business Incubator, Graphic Era
                  University, and Machine Learning Intern at CodeAlpha
                  (remote).
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full bg-accent" />
                <p className="font-mono text-xs text-muted">Now</p>
                <p className="mt-1 text-sm text-foreground">
                  B.Tech CSE (AI &amp; ML), Graphic Era Deemed University —
                  building full-stack and AI/ML projects alongside
                  coursework.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full border border-muted" />
                <p className="font-mono text-xs text-muted">Next</p>
                <p className="mt-1 text-sm text-foreground">
                  Looking for an AI/ML or software engineering internship to
                  ship features to real users.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden border-t border-surface-border px-6 py-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-xl text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              03 — Contact
            </p>
            <h2 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Let&apos;s build
              <br />
              something.
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-muted">
              Open to AI/ML and software engineering internships, or just a
              good conversation about what you&apos;re building.
            </p>
            <div className="mt-10 text-left">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
