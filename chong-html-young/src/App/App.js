import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Moria from "./Moria/Moria";
import Galmel from "./galmel";
console.log("Galmel:", Galmel);

// 나머지 건물 페이지들 (추가 가능)
import Bogeum from "./pages/Bogeum/Bogeum";
import IllipA from "./pages/IllipA/IllipA";
import IllipB from "./pages/IllipB/IllipB";
import Milal from "./pages/Milal/Milal";


function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
useEffect(() => {
  setScreenSize();
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moria" element={<Moria />} />
        <Route path="/galmel" element={<Galmel />} />
        <Route path="/bogeum" element={<Bogeum />} />
        <Route path="/IllipA" element={<IllipA />} />
        <Route path="/IllipB" element={<IllipB />} />
        <Route path="/milal" element={<Milal />} />
      </Routes>
    </Router>
  );
}

export default App;
