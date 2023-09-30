import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./Patient/Auth";
import Home from "./Home.js"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/patient_auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
