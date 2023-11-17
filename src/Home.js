import React, { useRef } from "react";
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import { useTexture, Plane, Box } from "@react-three/drei";
import { useNavigate } from "react-router-dom";


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
        <Plane
          args={[artworkWidth, artworkHeight]}
          position={[0, 0, frameDepth]}
        >
          <meshStandardMaterial attach="material" map={artworkTexture} />
        </Plane>
        <Box
          args={[
            artworkWidth + frameWidth,
            artworkHeight + frameWidth,
            frameDepth,
          ]}
        >
          <meshStandardMaterial attach="material" color={"brown"} />
        </Box>
      </group>
    </mesh>
  );
}

function Home() {
  const artworkRefs = [useRef(), useRef()]; // Refs for each ArtworkBox

  const navigate = useNavigate();

  // const handleMarkerFound = (markerId) => {
  //   console.log("Marker Found:", markerId);

  //   // Set visibility of ArtworkBoxes based on the selected marker
  //   artworkRefs.forEach((ref, index) => {
  //     if (ref.current) {
  //       ref.current.visible = markerId === index + 1; // Assuming markerId starts from 1
  //     }
  //   });
  // };

  const handleMarkerFound = (markerId) => {
    console.log("Marker Found:", markerId);
    // Navigate based on the markerId
    switch (markerId) {
      case 1:
        navigate("/ex1");
        break;
      case 2:
        navigate("/ex2");
        break;
      default:
        console.log("Unknown Marker");
    }
  }

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
        patternUrl={"/data/pattern-exhibit_a.patt"}
        onMarkerFound={() => handleMarkerFound(1)}
      />
      <ARMarker
        debug={false}
        params={{ smooth: true }}
        type={"pattern"}
        patternUrl={"/data/pattern-exhibit_b.patt"}
        onMarkerFound={() => handleMarkerFound(2)}
      />
      {/* Render ArtworkBoxes outside of ARMarkers */}
      {artworkRefs.map((artworkRef, index) => (
        <ArtworkBox
          key={index}
          inputTexture={`/data/exhibit${index + 1}.jpg`}
          isVisible={true} // Initially set to false, will be updated by handleMarkerFound
          ref={artworkRef}
        />
      ))}
    </ARCanvas>
  );
}

export default Home;
