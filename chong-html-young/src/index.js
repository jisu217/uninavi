// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";  // ✅ Routes, Route도 추가
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Home from "./Home/Home";
import Galmel from "./galmel/galmel";   // ✅ 갈멜관 페이지 import
import Moria from "./Moria/Moria";
import Bogeum from "./Bogeum/Bogeum";
import Milal from "./Milal/Milal";
import IllipA from "./IllipA/IllipA";
import IllipB from "./IllipB/IllipB";





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/galmel" element={<Galmel />} />
                <Route path="/moria" element={<Moria />} />
                <Route path="/Bogeum" element={<Bogeum />} />
                <Route path="/Milal" element={<Milal />} />
                <Route path="/IllipA" element={<IllipA />} />
                <Route path="/IllipB" element={<IllipB />} />

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
