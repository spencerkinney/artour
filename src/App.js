import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Exhibit from "./Exhibit";
import VideoExhibit from "./VideoExhibit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/0" element={<Exhibit />} />
        <Route path="/2" element={<VideoExhibit />} />
      </Routes>
    </Router>
  );
}
export default App;