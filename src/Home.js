import React, { useRef } from "react";
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import { useTexture, Plane, Box } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const markerPatterns = ["/data/pattern-tuan.patt"];

function ArtworkBox({ inputTexture }) {
  const artworkTexture = useTexture(inputTexture);
  // Adjust these dimensions as needed
  const artworkWidth = 1.5; 
  const artworkHeight = 2; 

  // This ensures the artwork is centered and aligned with the marker
  const groupRotation = [(Math.PI / 2) * -1, 0, 0]; 

  return (
    <group rotation={groupRotation}>
      <Plane args={[artworkWidth, artworkHeight]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" map={artworkTexture} />
      </Plane>
    </group>
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
      <ARMarker
        debug={false}
        params={{ smooth: true }}
        type={"pattern"}
        patternUrl={"/data/pattern-2.patt"}
      >
        <ArtworkBox inputTexture={"/data/exhibit2.jpg"}/>
      </ARMarker>
    </ARCanvas>
  );
}

export default Home;
