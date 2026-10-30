"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import type { Group } from "three";

const ACCENT = "#ff2d6e";
const ACCENT_2 = "#2aa9ff";

// Reads the --accent / --accent-2 CSS custom properties so the WebGL scene
// follows the active theme (Three.js materials need real color values, they
// can't reference CSS variables directly).
function useThemeColors() {
  const [colors, setColors] = useState({ accent: ACCENT, accent2: ACCENT_2 });

  useEffect(() => {
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue("--accent").trim() || ACCENT;
      const accent2 = style.getPropertyValue("--accent-2").trim() || ACCENT_2;
      setColors({ accent, accent2 });
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}

function OrbitRing({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.012, 16, 128]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function AccentShard({
  position,
  scale,
  speed,
  color,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  return (
    <Float speed={speed} rotationIntensity={1.1} floatIntensity={1.6}>
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const { accent, accent2 } = useThemeColors();

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={1}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color={accent} />
      <pointLight position={[4, 2, -2]} intensity={0.5} color={accent2} />

      <OrbitRing radius={1.45} tilt={[Math.PI / 2.6, 0.3, 0]} speed={0.15} color={accent} />
      <OrbitRing radius={1.7} tilt={[Math.PI / 2.1, -0.5, 0.4]} speed={-0.1} color={accent2} />
      <AccentShard position={[-2.1, 1.1, -1]} scale={0.18} speed={1.4} color={accent} />
      <AccentShard position={[2.2, -0.9, -0.5]} scale={0.14} speed={1.8} color={accent2} />
      <AccentShard position={[1.6, 1.4, -1.5]} scale={0.1} speed={2.2} color={accent} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.5}
        dampingFactor={0.1}
      />
    </Canvas>
  );
}
