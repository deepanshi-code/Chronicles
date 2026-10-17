"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-full bg-indigo-500/10" />
  ),
});

export default function Hero3D() {
  return (
    <div className="aspect-square w-full max-w-md" data-cursor-hover>
      <HeroScene />
    </div>
  );
}
