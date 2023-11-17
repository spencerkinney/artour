import React from "react";
import { useThree, extend } from "@react-three/fiber";
import { CubeTextureLoader, CubeReflectionMapping } from "three"; // Remove RGBFormat

extend({ CubeTextureLoader });

function Skybox() {
  const { scene } = useThree();

  const loader = new CubeTextureLoader();

  // Ensure that your skybox image has equal width and height for all faces
  const cubeTexture = loader.load([
    "/data/skybox.jpg", // Right
    "/data/skybox.jpg", // Left
    "/data/skybox.jpg", // Top
    "/data/skybox.jpg", // Bottom
    "/data/skybox.jpg", // Front
    "/data/skybox.jpg", // Back
  ]);

  // Set the mapping to CubeReflectionMapping
  cubeTexture.mapping = CubeReflectionMapping;

  scene.background = cubeTexture;

  return null;
}

export default Skybox;
