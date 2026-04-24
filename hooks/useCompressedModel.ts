"use client";

import { useGLTF } from "@react-three/drei";

export function useCompressedModel(path: string) {
  return useGLTF(path, true, true);
}

export function preloadCompressedModel(path: string) {
  useGLTF.preload(path, true, true);
}
