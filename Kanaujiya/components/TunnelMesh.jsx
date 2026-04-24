"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BackSide, MathUtils, Vector2 } from "three";
import TunnelShaderMaterial from "./TunnelShaderMaterial";

export default function TunnelMesh({
  isMobile,
  mouseRef,
  progressRef,
  tunnelLength = 58,
}) {
  const materialRef = useRef();
  const particleGroupRef = useRef();
  const smoothedMouse = useRef(new Vector2(0, 0));

  const particlePositions = useMemo(() => {
    const count = isMobile ? 900 : 1600;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * 2.4;
      const z = -Math.random() * tunnelLength;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;
    }

    return positions;
  }, [isMobile, tunnelLength]);

  useFrame((state) => {
    if (!materialRef.current) {
      return;
    }

    smoothedMouse.current.lerp(
      new Vector2(mouseRef.current.x, mouseRef.current.y),
      isMobile ? 0.04 : 0.08
    );

    materialRef.current.u_time = state.clock.elapsedTime;
    materialRef.current.u_scroll = progressRef.current;
    materialRef.current.u_mouse = smoothedMouse.current;
    materialRef.current.u_detail = isMobile ? 0.65 : 1;

    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.z = MathUtils.lerp(
        particleGroupRef.current.rotation.z,
        smoothedMouse.current.x * 0.1,
        0.04
      );
      particleGroupRef.current.position.x = MathUtils.lerp(
        particleGroupRef.current.position.x,
        smoothedMouse.current.x * 0.18,
        0.03
      );
      particleGroupRef.current.position.y = MathUtils.lerp(
        particleGroupRef.current.position.y,
        -smoothedMouse.current.y * 0.18,
        0.03
      );
    }
  });

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -tunnelLength / 2]}>
        <cylinderGeometry args={[3.2, 3.2, tunnelLength, 96, isMobile ? 280 : 420, true]} />
        <tunnelShaderMaterial ref={materialRef} side={BackSide} transparent />
      </mesh>

      <group ref={particleGroupRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={particlePositions}
              count={particlePositions.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#8ecbff"
            size={isMobile ? 0.028 : 0.038}
            sizeAttenuation
            transparent
            opacity={0.8}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}
