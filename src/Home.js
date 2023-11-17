import React, { useRef } from "react";
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import { useTexture, Plane, Box } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const markerPatterns = [
  "/data/pattern-tuan.patt",
  "/data/pattern-1.patt",
  "/data/pattern-2.patt",
  "/data/pattern-3.patt",
  "/data/pattern-4.patt",
  "/data/pattern-5.patt",
];

function ArtworkBox({ inputTexture, isVisible }) {
  const artworkTexture = useTexture(inputTexture); // Load the artwork image
  const artworkWidth = 1.5; // Example width
  const artworkHeight = 2; // Example height
  const frameDepth = 0.05; // The depth of the frame
  const frameWidth = 0.1; // The width of the frame's border
  const groupRotation = [(Math.PI / 2) * -1, 0, 0];

  return (
    <mesh isVisible={isVisible} position={[0, 0, 0]}>
      <group rotation={groupRotation}>
        <Plane args={[artworkWidth, artworkHeight]} position={[0, 0, frameDepth]}>
          <meshStandardMaterial attach="material" map={artworkTexture} />
        </Plane>
        <Box args={[artworkWidth + frameWidth, artworkHeight + frameWidth, frameDepth]}>
          <meshStandardMaterial attach="material" color={"brown"} />
        </Box>
      </group>
    </mesh>
  );
}

function Home() {
  const artworkRefs = useRef(); // Ref for ArtworkBox

  const navigate = useNavigate();

  const handleMarkerFound = (markerId) => {
    console.log("Marker Found:", markerId);

    // Navigate based on the markerId
    if (markerId >= 0 && markerId < markerPatterns.length) {
      navigate(`/${markerId}`);
    } else {
      console.log("Unknown Marker");
    }
  };

  return (
    <ARCanvas
      onCameraStreamReady={() => console.log("Camera stream ready")}
      onCameraStreamError={() => console.error("Camera stream error")}
      sourceType={"webcam"}
    >
      <ambientLight />
      <pointLight position={[10, 10, 0]} intensity={10.0} />

      {markerPatterns.map((patternUrl, index) => (
        <ARMarker
          key={index}
          debug={false}
          //params={{ smooth: true }}
          type={"pattern"}
          patternUrl={patternUrl}
          onMarkerFound={() => handleMarkerFound(index)}
        />
      ))}
    </ARCanvas>
  );
}

export default Home;