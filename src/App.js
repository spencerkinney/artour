import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Exhibit from "./Exhibit";
import VideoExhibit1 from "./VideoExhibit1";
import VideoExhibit2 from "./VideoExhibit2";
import VideoExhibit3 from "./VideoExhibit3";
import VideoExhibit4 from "./VideoExhibit4";
import VideoExhibit5 from "./VideoExhibit5";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/0" element={<Exhibit />} />
        <Route path="/1" element={<VideoExhibit1 />} />
        <Route path="/2" element={<VideoExhibit2 />} />
        <Route path="/3" element={<VideoExhibit3 />} />
        <Route path="/4" element={<VideoExhibit4 />} />
        <Route path="/5" element={<VideoExhibit5 />} />
      </Routes>
    </Router>
  );
}
export default App;