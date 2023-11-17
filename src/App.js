import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Exhibit from "./Exhibit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ex1" element={<Exhibit />} />
      </Routes>
    </Router>
  );
}
export default App;