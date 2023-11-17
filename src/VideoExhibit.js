import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Text } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import Skybox from "./Skybox";
import "./Exhibit.css";

function ArtworkBox({ rotationSpeed, position, videoTexture }) {
  const artworkWidth = 3.4;
  const artworkHeight = 2;
  const frameDepth = 0.1; // Depth of the frame
  const shadowOpacity = 0.3; // Opacity of the shadow
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh position={position} ref={meshRef} rotation={[0, 0, 0]} castShadow receiveShadow>
      <group rotation={[0, 0, 0]}>
        {/* Front side (artwork) */}
        <group position={[0, 0, frameDepth / 2]}>
          {/* Increase the extrude depth to eliminate the gap */}
          <mesh>
            <planeGeometry args={[artworkWidth, artworkHeight, 1, 1]} extrude={[0, 0, frameDepth]} />
            <meshPhysicalMaterial attach="material" map={videoTexture} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Back side (art frame and text) */}
        <group position={[0, 0, -frameDepth / 2]}>
          {/* Gray art frame */}
          <mesh>
            <boxGeometry args={[artworkWidth, artworkHeight, frameDepth]} />
            <meshPhysicalMaterial attach="material" color="gray" side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <Text
              color="black"
              anchorX="center"
              anchorY="middle"
              fontSize={0.1}
              position={[0, 0, -frameDepth / 2 - 0.01]}
              rotation={[0, Math.PI, 0]}
              maxWidth={artworkWidth * 0.9}
            >
              This piece was created by Tuan Jones in 2023. You can contact Tuan at tuan@example.com
            </Text>
          </mesh>
          {/* Add a point light for the back */}
          <pointLight position={[0, 0, -frameDepth]} intensity={5} color="white" distance={5} decay={2} />
        </group>
      </group>

      {/* Add a shadow */}
      <meshBasicMaterial attach="material" color="black" opacity={shadowOpacity} transparent />
    </mesh>
  );
}

function VideoExhibit() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/");
  };

  const controlsRef = useRef();
  const [enableRotate, setEnableRotate] = useState(true);
  const [videoTexture, setVideoTexture] = useState(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/data/Lagoon-Pan.mp4";
    video.loop = true;
    video.muted = true;

    video.play().then(() => {
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      setVideoTexture(texture);
    });

    return () => {
      video.load();
    };
  }, []);

  const artPosition = [0, 0, 3]; // Set the art's position

  return (
    <div className="exhibit-container">
      <Canvas className="canvas-container">
        {/* Dark background */}
        <color attach="background" args={["#121212"]} />

        {/* Ambient light */}
        <ambientLight intensity={0.9} />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.1}
          rotateSpeed={0.5}
          enableRotate={enableRotate} // Enable/disable rotation
          target={artPosition} // Set the orbit target to the art's position
        />

        {/* Artwork */}
        <ArtworkBox rotationSpeed={0} position={artPosition} videoTexture={videoTexture} />

        {/* Ground plane */}
        <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -1.5, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial attach="material" color="#333" />
        </mesh>
      </Canvas>
      <div className="exhibit-content">
        <p className="exhibit-description">A Lagoon View</p>
        <button className="back-button" onClick={handleBackClick}>
          Back home
        </button>
      </div>
    </div>
  );
}

export default VideoExhibit;
