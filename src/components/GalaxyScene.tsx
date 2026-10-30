"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Group } from "three";

const ACCENT = "#ff2d6e";
const PARTICLE_COUNT = 700;

function createPositions(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 22;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
  }
  return arr;
}

// Computed once when this client-only module loads, not during render.
const POSITIONS = createPositions(PARTICLE_COUNT);

function useAccentColor() {
  const [color, setColor] = useState(ACCENT);

  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      setColor(value || ACCENT);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return color;
}

function Stars({ color, spin }: { color: string; spin: boolean }) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!ref.current || !spin) return;
    ref.current.rotation.y += delta * 0.012;
    ref.current.rotation.x += delta * 0.004;
  });

  return (
    <group ref={ref}>
      <Points positions={POSITIONS} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </group>
  );
}

export default function GalaxyScene() {
  const accent = useAccentColor();
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setSpin(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 65 }}
      dpr={1}
      gl={{ antialias: false, alpha: true }}
      frameloop={spin ? "always" : "never"}
    >
      <Stars color={accent} spin={spin} />
    </Canvas>
  );
}
