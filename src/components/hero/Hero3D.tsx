"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-full bg-accent/10" />
  ),
});

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full max-w-lg touch-none"
    >
      <div className="absolute inset-0">
        <HeroScene active={active} />
      </div>
      <div
        className="absolute inset-[8%] overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(circle closest-side at center, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle closest-side at center, black 35%, transparent 100%)",
        }}
      >
        <Image
          src="/hero/android-head.jpg"
          alt="Android head illustration"
          fill
          sizes="(min-width: 1024px) 512px, 90vw"
          className="object-cover object-top"
          priority
        />
      </div>
    </div>
  );
}
