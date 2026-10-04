import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Detect WebGL capability safely
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Inner Core Mesh with multi-layered geometry, emissive shaders, and orbital rings
interface CoreMeshProps {
  mousePosition: { x: number; y: number };
  isHovered: boolean;
  reducedMotion: boolean;
  intensity?: number;
}

function AICoreMesh({ mousePosition, isHovered, reducedMotion, intensity = 1 }: CoreMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const outerIcosaRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particle cloud with depth
  const particleCount = 140;
  const { particlePositions, particleColors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorTeal = new THREE.Color(0x2dd4bf);
    const colorViolet = new THREE.Color(0x818cf8);

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a spherical shell around the core
      const radius = 2.0 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? colorCyan : i % 3 === 1 ? colorTeal : colorViolet;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    return { particlePositions: positions, particleColors: colors };
  }, []);

  // Frame animation loop with smooth damping
  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();
    const speedFactor = (isHovered ? 1.3 : 1.0) * intensity;

    // Smooth subtle mouse tilt on the primary group
    if (groupRef.current) {
      const targetRotationX = mousePosition.y * 0.35;
      const targetRotationY = mousePosition.x * 0.45;
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotationX,
        2.5,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotationY,
        2.5,
        delta
      );
    }

    // Inner pulsating core
    if (innerSphereRef.current) {
      const pulse = Math.sin(time * 2.2) * 0.05 + 1.0;
      innerSphereRef.current.scale.set(pulse, pulse, pulse);
      innerSphereRef.current.rotation.y += delta * 0.25 * speedFactor;
    }

    // Outer crystalline icosahedron lattice
    if (outerIcosaRef.current) {
      outerIcosaRef.current.rotation.x += delta * 0.15 * speedFactor;
      outerIcosaRef.current.rotation.y -= delta * 0.2 * speedFactor;
    }

    // Layered orbital rings with distinct angles and directions
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.45 * speedFactor;
      ring1Ref.current.rotation.x = Math.sin(time * 0.5) * 0.2 + 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.35 * speedFactor;
      ring2Ref.current.rotation.y = Math.cos(time * 0.4) * 0.25 + 0.8;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.28 * speedFactor;
      ring3Ref.current.rotation.y += delta * 0.22 * speedFactor;
    }

    // Particles slow drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05 * speedFactor;
      particlesRef.current.rotation.x = Math.sin(time * 0.04) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Deep Core: High emissive dense plasma sphere */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshStandardMaterial
          color={isHovered ? '#38bdf8' : '#0284c7'}
          emissive={isHovered ? '#0ea5e9' : '#0369a1'}
          emissiveIntensity={isHovered ? 1.6 : 1.1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Middle Layer: Translucent faceted dodecahedron */}
      <mesh>
        <dodecahedronGeometry args={[1.35, 0]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.85}
          opacity={0.35}
          transparent={true}
          roughness={0.15}
          ior={1.4}
          thickness={0.6}
        />
      </mesh>

      {/* 3. Outer Layer: Fine wireframe geometric shield */}
      <mesh ref={outerIcosaRef}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive="#0284c7"
          emissiveIntensity={0.4}
          wireframe={true}
          transparent={true}
          opacity={isHovered ? 0.45 : 0.25}
        />
      </mesh>

      {/* 4. Orbital Ring 1 (Horizontal Inclined) */}
      <group ref={ring1Ref} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.2, 0.02, 16, 80]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>
        {/* Orbital energy beacon */}
        <mesh position={[2.2, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#38bdf8"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* 5. Orbital Ring 2 (Vertical Elliptic) */}
      <group ref={ring2Ref} rotation={[-0.6, 0.7, 0.3]}>
        <mesh>
          <torusGeometry args={[2.6, 0.015, 16, 80]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={0.9}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[-2.6, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#e0e7ff"
            emissive="#818cf8"
            emissiveIntensity={2.0}
          />
        </mesh>
      </group>

      {/* 6. Orbital Ring 3 (Outer Accent Ring) */}
      <group ref={ring3Ref} rotation={[1.1, -0.4, 0.8]}>
        <mesh>
          <torusGeometry args={[3.0, 0.012, 16, 90]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#14b8a6"
            emissiveIntensity={0.8}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* 7. Floating Quantum Particles Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Interactive Scene Container with fallback and mouse parallax tracking
interface SceneCoreProps {
  className?: string;
  intensity?: number;
  cameraDistance?: number;
  showStatusOverlay?: boolean;
}

export function SceneCore({
  className = 'w-full h-full min-h-[380px]',
  intensity = 1,
  cameraDistance = 5.2,
  showStatusOverlay = false,
}: SceneCoreProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Fallback rendering when WebGL is unavailable
  if (!hasWebGL) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-[#0b1329] to-[#05070d] ${className}`}
        role="img"
        aria-label="NEXORA AI Core 3D Visualization Fallback"
      >
        <div className="absolute inset-0 bg-radial-vignette opacity-50" />
        <div className="relative flex flex-col items-center text-center p-6 max-w-sm">
          <div className="w-32 h-32 rounded-full border border-cyan-400/40 bg-cyan-500/10 flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-pulse">
            <div className="w-20 h-20 rounded-full border border-sky-400/60 bg-sky-500/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50" />
            </div>
          </div>
          <p className="mt-4 text-xs font-mono uppercase tracking-wider text-cyan-300">
            Quantum Core Engine Active
          </p>
          <span className="text-xs text-slate-400 mt-1">
            Accelerated 2D mode active
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative select-none overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        camera={{ position: [0, 0, cameraDistance], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Calibrated Studio Lighting: Ambient + Key + Rim Backlight */}
        <ambientLight intensity={0.45} />
        {/* Warm key light */}
        <directionalLight position={[4, 5, 4]} intensity={1.4} color="#f0f9ff" />
        {/* Cool rim light for depth separation */}
        <directionalLight position={[-4, -3, -3]} intensity={1.8} color="#38bdf8" />
        {/* Soft violet fill light */}
        <pointLight position={[0, -2, 2]} intensity={0.8} color="#818cf8" />

        <AICoreMesh
          mousePosition={mousePosition}
          isHovered={isHovered}
          reducedMotion={reducedMotion}
          intensity={intensity}
        />
      </Canvas>

      {/* Discreet interaction affordance & telemetry indicator if requested */}
      {showStatusOverlay && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-xs text-slate-400 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300 font-medium">Neural Core Active</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Interactive Parallax · Move cursor to orbit
          </span>
        </div>
      )}
    </div>
  );
}
