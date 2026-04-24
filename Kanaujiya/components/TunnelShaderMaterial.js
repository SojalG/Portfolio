"use client";

import { Color, Vector2 } from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

const TunnelShaderMaterial = shaderMaterial(
  {
    u_time: 0,
    u_scroll: 0,
    u_mouse: new Vector2(0, 0),
    u_color1: new Color("#57e8ff"),
    u_color2: new Color("#9b5cff"),
    u_detail: 1,
  },
  vertexShader,
  fragmentShader
);

extend({ TunnelShaderMaterial });

export default TunnelShaderMaterial;
