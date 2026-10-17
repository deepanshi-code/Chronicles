"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import type { Mesh } from "three";

function DistortedBlob() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 4) * 0.3;
    meshRef.current.rotation.y = t * 0.15;

    const { x, y } = state.pointer;
    meshRef.current.rotation.y += x * 0.15;
    meshRef.current.rotation.x += y * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.45}
          speed={1.8}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <pointLight position={[-3, -2, -2]} intensity={0.6} color="#a855f7" />
      <Suspense fallback={null}>
        <DistortedBlob />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
