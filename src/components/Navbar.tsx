"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
        <Link
          href="/"
          className="shrink-0 font-mono text-xs uppercase tracking-widest text-foreground sm:text-sm"
        >
          <span className="sm:hidden">D. Agarwal</span>
          <span className="hidden sm:inline">Deepanshi Agarwal</span>
        </Link>
        <ul className="flex gap-4 text-xs sm:gap-8 sm:text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`transition-colors ${
                    active ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
