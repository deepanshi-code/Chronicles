"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  Points,
  PointMaterial,
} from "@react-three/drei";
import type { Group, Mesh } from "three";

const ACCENT = "#c6ff3d";
const PARTICLE_COUNT = 400;

function createParticlePositions(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 3.2 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = radius * Math.cos(phi);
  }
  return arr;
}

// Computed once when this client-only module loads, not during render.
const PARTICLE_POSITIONS = createParticlePositions(PARTICLE_COUNT);

function ParticleField() {
  const pointsRef = useRef<Group>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.025;
  });

  return (
    <group ref={pointsRef}>
      <Points positions={PARTICLE_POSITIONS} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={ACCENT}
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function GlassKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.15}>
        <torusKnotGeometry args={[0.85, 0.26, 220, 32]} />
        <MeshTransmissionMaterial
          color="#ffffff"
          thickness={0.6}
          roughness={0.05}
          transmission={1}
          ior={1.25}
          chromaticAberration={0.04}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.1}
          clearcoat={1}
          resolution={256}
          samples={2}
        />
      </mesh>
    </Float>
  );
}

function AccentShard({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={1.1} floatIntensity={1.6}>
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={1}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
    >
      <color attach="background" args={[0, 0, 0]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color={ACCENT} />

      <Suspense fallback={null}>
        <GlassKnot />
        <AccentShard position={[-2.1, 1.1, -1]} scale={0.18} speed={1.4} />
        <AccentShard position={[2.2, -0.9, -0.5]} scale={0.14} speed={1.8} />
        <AccentShard position={[1.6, 1.4, -1.5]} scale={0.1} speed={2.2} />
        <ParticleField />
        <Environment resolution={256}>
          <group rotation={[0, 0, Math.PI / 3]}>
            <Lightformer
              form="rect"
              intensity={4}
              position={[0, 2, -3]}
              scale={[6, 2, 1]}
              color="#ffffff"
            />
            <Lightformer
              form="rect"
              intensity={6}
              position={[-3, -1, 2]}
              scale={[3, 2, 1]}
              color={ACCENT}
            />
            <Lightformer
              form="ring"
              intensity={3}
              position={[3, 2, 2]}
              scale={3}
              color="#ffffff"
            />
          </group>
        </Environment>
      </Suspense>

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
