"use client";

import { useEffect, useState } from "react";

type Theme = "default" | "coral";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-theme");
    if (stored === "coral") setTheme("coral");
  }, []);

  useEffect(() => {
    if (theme === "coral") {
      document.documentElement.setAttribute("data-theme", "coral");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "default" ? "coral" : "default"))}
      aria-label="Toggle color theme"
      title={theme === "default" ? "Switch to Steel & Coral theme" : "Switch to Rose & Cerulean theme"}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface-border transition-colors hover:border-accent"
    >
      <span className="flex gap-0.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-2" />
      </span>
    </button>
  );
}
