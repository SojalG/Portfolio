"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import TunnelMesh from "../components/TunnelMesh";
import CameraController from "../components/CameraController";
import ScrollManager from "../components/ScrollManager";
import Sections from "../components/Sections";

export default function Page() {
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const aberrationOffset = useMemo(
    () => (isMobile ? new Vector2(0.00055, 0.00075) : new Vector2(0.0009, 0.0012)),
    [isMobile]
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsMobile(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;

      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-night text-white">
      <div className="pointer-events-none fixed inset-0 bg-hero-grid bg-hero-grid-size opacity-70" />

      <div className="fixed inset-0">
        <Canvas
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 2.8], fov: isMobile ? 76 : 62, near: 0.1, far: 120 }}
        >
          <color attach="background" args={["#02030a"]} />
          <fog attach="fog" args={["#02030a", 6, 54]} />

          <ambientLight intensity={0.18} />
          <pointLight position={[0.2, 0.4, 3]} color="#57e8ff" intensity={24} distance={18} />
          <pointLight position={[-0.4, -0.6, -25]} color="#9b5cff" intensity={34} distance={22} />

          <TunnelMesh
            isMobile={isMobile}
            mouseRef={mouseRef}
            progressRef={progressRef}
            tunnelLength={58}
          />
          <CameraController
            isMobile={isMobile}
            mouseRef={mouseRef}
            progressRef={progressRef}
            tunnelLength={58}
          />

          <AdaptiveDpr pixelated />

          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom
              intensity={isMobile ? 0.7 : 1.1}
              luminanceThreshold={0.16}
              luminanceSmoothing={0.28}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={aberrationOffset}
              radialModulation
              modulationOffset={0.35}
            />
            <Noise opacity={0.02} premultiply />
            <Vignette eskil={false} offset={0.18} darkness={0.78} />
          </EffectComposer>
        </Canvas>
      </div>

      <ScrollManager progressRef={progressRef} setProgress={setProgress}>
        <Sections progress={progress} />
      </ScrollManager>
    </main>
  );
}
