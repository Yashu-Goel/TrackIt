import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientAuth from "./Patient/Auth";
import DoctorAuth from "./Doctor/Auth";
import DoctorHome from "./Doctor/Home";
import Home from "./Home.js";
import DoctorProvider from "./Doctor/DoctorProvide";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/patient_auth" element={<PatientAuth />} />
        <Route
          path="/doctor_auth"
          element={
            <DoctorProvider>
              <DoctorAuth />
            </DoctorProvider>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/doctor_home"
          element={
            <DoctorProvider>
              <DoctorHome />
            </DoctorProvider>
          }
        />
      </Routes>
    </>
  );
};

export default App;
