"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "@/components/ThemeToggle";

const sectionIds = ["home", "projects", "about", "contact"];
const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(sectionIds, isHome);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-surface-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-xs font-bold text-accent-ink transition-transform group-hover:scale-105">
            D
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground sm:text-sm">
            <span className="sm:hidden">Agarwal</span>
            <span className="hidden sm:inline">Deepanshi Agarwal</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <ul className="flex gap-4 text-xs sm:gap-8 sm:text-sm">
            {sections.map((section) => {
              const href = section.id === "home" ? "/" : `/#${section.id}`;
              const active = isHome && activeId === section.id;
              return (
                <li key={section.id} className="relative">
                  <Link
                    href={href}
                    className={`transition-colors ${
                      active ? "text-accent" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {section.label}
                  </Link>
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                  )}
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
