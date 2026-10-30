"use client";

import dynamic from "next/dynamic";

const GalaxyScene = dynamic(() => import("./GalaxyScene"), { ssr: false });

export default function GalaxyBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <GalaxyScene />
    </div>
  );
}
