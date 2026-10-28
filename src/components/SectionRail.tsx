"use client";

import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

const sectionIds = ["home", "projects", "about", "contact"];
const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SectionRail() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeId = useActiveSection(sectionIds, isHome);

  if (!isHome) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 lg:flex"
    >
      {sections.map((section) => {
        const active = activeId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
          >
            <span
              className={`font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
                active
                  ? "translate-x-0 text-foreground opacity-100"
                  : "translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active
                  ? "h-2.5 w-2.5 bg-accent"
                  : "h-1.5 w-1.5 bg-surface-border group-hover:bg-muted"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
