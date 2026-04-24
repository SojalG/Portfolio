"use client";

import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Float, Preload } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { damp } from "@/utils/easing";

type RigState = {
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  lookX: number;
  lookY: number;
  objectScale: number;
  objectY: number;
  objectRotation: number;
  tunnelRotation: number;
};

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float uTime;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 transformed = position + normal * sin((position.y + uTime * 0.7) * 5.0) * 0.045;
    vPosition = transformed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  float fresnel(vec3 normal) {
    return pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.2);
  }

  void main() {
    float wave = sin(vPosition.y * 4.0 + uTime) * 0.5 + 0.5;
    vec3 color = mix(uColorA, uColorB, wave + vUv.x * 0.2);
    float edge = fresnel(vNormal);
    gl_FragColor = vec4(color + edge * 0.85, 0.72 + edge * 0.28);
  }
`;

function ScrollCameraRig({ rig }: { rig: React.MutableRefObject<RigState> }) {
  const { camera, pointer } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(), []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4
      }
    });

    timeline
      .to(rig.current, { cameraX: 0.8, cameraY: 0.2, cameraZ: 7, lookY: 0.1, objectScale: 1.1, objectY: -0.1, duration: 1 })
      .to(rig.current, { cameraX: -3.2, cameraY: 1.15, cameraZ: 5.5, lookX: -0.7, lookY: 0.28, objectScale: 1.45, objectRotation: 1.2, tunnelRotation: 0.7, duration: 1 })
      .to(rig.current, { cameraX: 2.8, cameraY: -0.25, cameraZ: 4.7, lookX: 0.45, lookY: -0.1, objectScale: 0.92, objectRotation: 2.7, tunnelRotation: 1.5, duration: 1 })
      .to(rig.current, { cameraX: 0, cameraY: 0.85, cameraZ: 6.3, lookX: 0, lookY: 0.12, objectScale: 1.22, objectRotation: 4.4, tunnelRotation: 2.3, duration: 1 });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [rig]);

  useFrame((_, delta) => {
    const targetX = rig.current.cameraX + pointer.x * 0.44;
    const targetY = rig.current.cameraY + pointer.y * 0.34;

    camera.position.x = damp(camera.position.x, targetX, 3.2, delta);
    camera.position.y = damp(camera.position.y, targetY, 3.2, delta);
    camera.position.z = damp(camera.position.z, rig.current.cameraZ, 3.4, delta);

    lookAt.set(rig.current.lookX + pointer.x * 0.16, rig.current.lookY + pointer.y * 0.12, 0);
    camera.lookAt(lookAt);
  });

  return null;
}

function HeroArtifact({ rig }: { rig: React.MutableRefObject<RigState> }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.scale.setScalar(damp(group.current.scale.x, rig.current.objectScale, 3, delta));
    group.current.position.y = damp(group.current.position.y, rig.current.objectY + pointer.y * 0.18, 2.8, delta);
    group.current.rotation.x = damp(group.current.rotation.x, pointer.y * 0.42, 3.1, delta);
    group.current.rotation.y = damp(group.current.rotation.y, rig.current.objectRotation + pointer.x * 0.52, 3.1, delta);
    group.current.rotation.z += delta * 0.08;

    if (shell.current) {
      shell.current.rotation.y -= delta * 0.18;
      shell.current.rotation.x += delta * 0.07;
    }

    if (shader.current) {
      shader.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <Float speed={1.45} rotationIntensity={0.25} floatIntensity={0.55}>
      <group ref={group} position={[0.95, 0.03, 0]} scale={0.95}>
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.72, 16]} />
          <shaderMaterial
            ref={shader}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            uniforms={{
              uTime: { value: 0 },
              uColorA: { value: new THREE.Color("#2a1746") },
              uColorB: { value: new THREE.Color("#b185ff") }
            }}
          />
        </mesh>
        <mesh scale={1.015}>
          <icosahedronGeometry args={[1.74, 2]} />
          <meshBasicMaterial color="#f1e8ff" wireframe transparent opacity={0.14} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh rotation={[0.25, 0.2, -0.4]} scale={[2.55, 2.55, 0.045]}>
          <torusGeometry args={[1.1, 0.006, 12, 180]} />
          <meshBasicMaterial color="#cfb3ff" transparent opacity={0.82} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh rotation={[-0.58, 0.1, 0.86]} scale={[2.95, 2.95, 0.045]}>
          <torusGeometry args={[1.05, 0.005, 12, 180]} />
          <meshBasicMaterial color="#8b5cff" transparent opacity={0.56} blending={THREE.AdditiveBlending} />
        </mesh>
        <pointLight color="#d3bbff" intensity={5.8} distance={8} position={[2, 1.5, 2]} />
        <pointLight color="#7b4dff" intensity={3.4} distance={7} position={[-2, -1, 1.5]} />
      </group>
    </Float>
  );
}

function ParticleField({ rig }: { rig: React.MutableRefObject<RigState> }) {
  const points = useRef<THREE.Points>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.75) }
    }),
    []
  );

  const positions = useMemo(() => {
    const count = 950;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 4 + Math.random() * 7;
      const angle = Math.random() * Math.PI * 2;
      const depth = (Math.random() - 0.5) * 11;
      data[i * 3] = Math.cos(angle) * radius;
      data[i * 3 + 1] = (Math.random() - 0.5) * 6;
      data[i * 3 + 2] = Math.sin(angle) * radius + depth;
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (!points.current) return;
    points.current.rotation.y = damp(points.current.rotation.y, rig.current.tunnelRotation, 1.6, delta);
    points.current.rotation.x += delta * 0.012;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uPixelRatio;
          varying float vAlpha;

          void main() {
            vec3 transformed = position;
            transformed.x += sin(uTime * 0.25 + position.z * 0.3) * 0.12;
            transformed.y += cos(uTime * 0.2 + position.x * 0.2) * 0.1;
            vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = (18.0 * uPixelRatio) / -mvPosition.z;
            vAlpha = smoothstep(12.0, 2.0, length(position));
          }
        `}
        fragmentShader={`
          varying float vAlpha;

          void main() {
            float distanceToCenter = length(gl_PointCoord - vec2(0.5));
            float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
            vec3 color = mix(vec3(0.84, 0.75, 1.0), vec3(0.49, 0.3, 1.0), gl_PointCoord.x);
            gl_FragColor = vec4(color, strength * vAlpha * 0.75);
          }
        `}
      />
    </points>
  );
}

function LightTunnel({ rig }: { rig: React.MutableRefObject<RigState> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.z = damp(group.current.rotation.z, rig.current.tunnelRotation * 0.35, 1.9, delta);
  });

  return (
    <group ref={group} position={[0, 0, -2.5]}>
      {Array.from({ length: 9 }, (_, index) => (
        <mesh key={index} position={[0, 0, -index * 1.45]} rotation={[0, 0, index * 0.28]} scale={2.2 + index * 0.48}>
          <torusGeometry args={[1, 0.003, 8, 120]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#b185ff" : "#8f6bff"}
            transparent
            opacity={0.14 - index * 0.008}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  const rig = useRef<RigState>({
    cameraX: 0,
    cameraY: 0,
    cameraZ: 8.2,
    lookX: 0,
    lookY: 0,
    objectScale: 0.95,
    objectY: 0,
    objectRotation: 0,
    tunnelRotation: 0
  });

  return (
    <>
      <fog attach="fog" args={["#090612", 7, 18]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 3]} intensity={1.7} color="#f7f1ff" />
      <ScrollCameraRig rig={rig} />
      <LightTunnel rig={rig} />
      <ParticleField rig={rig} />
      <HeroArtifact rig={rig} />
      <Preload all />
    </>
  );
}

export default function CinematicScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 8.2], fov: 42, near: 0.1, far: 60 }}
        dpr={[1, 1.75]}
        onCreated={({ gl }) => {
          gl.setClearColor("#090612", 0);
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  );
}
