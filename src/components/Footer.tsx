"use client";

import { useEffect, useState } from "react";

const FALLBACK_YEAR = 2026;

export default function Footer() {
  const [year, setYear] = useState(FALLBACK_YEAR);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-black/10 py-8 text-center text-sm text-black/60 dark:border-white/10 dark:text-white/60">
      <p>© {year} Deepanshi Agarwal. Built with Next.js.</p>
    </footer>
  );
}
