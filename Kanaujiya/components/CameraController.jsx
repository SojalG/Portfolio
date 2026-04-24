"use client";

import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";

const lookTarget = new Vector3();

export default function CameraController({
  isMobile,
  mouseRef,
  progressRef,
  tunnelLength = 58,
}) {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.fov = size.width < 768 || isMobile ? 76 : 62;
    camera.updateProjectionMatrix();
  }, [camera, isMobile, size.width]);

  useFrame((state) => {
    const progress = progressRef.current;
    const targetZ = -progress * (tunnelLength - 4);
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const breathing = Math.sin(state.clock.elapsedTime * 0.9 + progress * Math.PI * 4.0) * 0.06;

    camera.position.x = MathUtils.lerp(camera.position.x, mouseX * 0.34, 0.06);
    camera.position.y = MathUtils.lerp(camera.position.y, -mouseY * 0.28 + breathing * 0.25, 0.06);
    camera.position.z = MathUtils.lerp(camera.position.z, targetZ + 2.8, 0.08);

    lookTarget.set(mouseX * 0.45, -mouseY * 0.35, camera.position.z - 6);
    camera.lookAt(lookTarget);
    camera.rotation.z = MathUtils.lerp(
      camera.rotation.z,
      mouseX * 0.08 + Math.sin(progress * Math.PI * 6.0) * 0.015,
      0.05
    );
  });

  return null;
}
