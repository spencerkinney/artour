import React, { useState } from "react";
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import { useTexture, Plane, Box } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

function ArtworkBox({ inputTexture }) {
  const artworkTexture = useTexture(inputTexture); // Load the artwork image
  const artworkWidth = 1.5; // Example width
  const artworkHeight = 2; // Example height
  const frameDepth = 0.05; // The depth of the frame
  const frameWidth = 0.1; // The width of the frame's border
  const groupRotation = [(Math.PI / 2) * -1, 0, 0];

  return (
    <group rotation={groupRotation}>
      {/* Artwork Plane */}
      <Plane args={[artworkWidth, artworkHeight]} position={[0, 0, frameDepth]}>
        <meshStandardMaterial attach="material" map={artworkTexture} />
      </Plane>

      {/* Frame Effect */}
      {/* Frame created using basic geometry and solid color */}
      <Box args={[artworkWidth + frameWidth, artworkHeight + frameWidth, frameDepth]}>
        <meshStandardMaterial attach="material" color={'brown'} /> {/* Solid color for the frame */}
      </Box>
    </group>
  );
}

function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerFound = (markerId) => {
    console.log("Marker Found:", markerId);
    setSelectedMarker(markerId);
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
        debug={true}
        params={{ smooth: true }}
        type={"pattern"}
        patternUrl={"/data/pattern-exhibit_a.patt"}
        onMarkerFound={() => console.log("Marker Found basquiat")}
      >
        <ArtworkBox inputTexture={"/data/exhibit1.jpg"}/>
      </ARMarker>
      <ARMarker
        debug={true}
        params={{ smooth: true }}
        type={"pattern"}
        patternUrl={"/data/pattern-exhibit_b.patt"}
        onMarkerFound={() => console.log("Marker Found tuan")}
      >
        <ArtworkBox inputTexture={"/data/exhibit2.jpg"}/>
      </ARMarker>


      {/* Repeat for other markers as needed */}
      {/* <ARMarker ... onMarkerFound={() => handleMarkerFound("marker2")} ...> */}
    </ARCanvas>
  );
}

export default App;