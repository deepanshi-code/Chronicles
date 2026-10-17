"use client";

import { useEffect, useState } from "react";

const FALLBACK_YEAR = 2026;

export default function Footer() {
  const [year, setYear] = useState(FALLBACK_YEAR);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-surface-border py-8 text-center font-mono text-xs text-muted">
      <p>© {year} Deepanshi Agarwal. Built with Next.js.</p>
    </footer>
  );
}
