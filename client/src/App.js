import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientAuth from "./Patient/Auth";
import DoctorAuth from "./Doctor/Auth";
import Home from "./Home.js"

const App = () => {
  return (
    <>
      <Routes>
      
        <Route path="/patient_auth" element={<PatientAuth />} />
        <Route path="/doctor_auth" element={<DoctorAuth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
