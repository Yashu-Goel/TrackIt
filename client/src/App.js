import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientAuth from "./Patient/Auth";
import DoctorAuth from "./Doctor/Auth";
import AddPatientPrescription from "./Doctor/AddPatientPrescription";
import Home from "./Home.js";
import DoctorProvider from "./Doctor/DoctorProvide";
import Dashboard from "./Doctor/Dashboard";

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
          path="/patient_prescription"
          element={
            <DoctorProvider>
              <AddPatientPrescription />
            </DoctorProvider>
          }
        />
        <Route
          path="/doctor_dashboard"
          element={
            <DoctorProvider>
              <Dashboard />
            </DoctorProvider>
          }
        />
      
      </Routes>
    </>
  );
};

export default App;
