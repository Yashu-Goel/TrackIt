import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./Patient/Auth";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/patient_auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
