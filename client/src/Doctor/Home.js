import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import "./Home.css";

const Home = () => {
  const [formData, setFormData] = useState({
    patient_name: "",
    patient_age: "",
    patient_weight: "",
    patient_height: "",
    prescription: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/doctor/upload_prescription",
        formData
      );

      console.log("Prescription saved:", response.data);

      setFormData({
        patient_name: "",
        patient_age: "",
        patient_weight: "",
        patient_height: "",
        prescription: "",
      });

      toast.success("Prescription submitted successfully");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.error || "Error submitting prescription"
        );
      } else {
        console.error("Error submitting prescription:", error.message);
      }
    }
  };

  return (
    
    <div>

      <Navbar />
      {/* <div className="header-DocHome">
      <h2>Upload Prescription</h2>
      </div> */}
      <div className="header-DocHome">
      <h1>Doctor's Name</h1>
      <h2>Clinic Address</h2>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="forFlex-DocHome">
        <div className="adjacent-field-DocHome">
          <label>Patient Code:</label>
          <input
            type="text"
            name="patient_code"
            className="input-DocHome"
            value={formData.patient_code}
            onChange={handleChange}
          />
        </div>
            <div className="adjacent-field-DocHome">
          <label>Patient Name:</label>
          <input
            type="text"
            name="patient_name"
            className="input-DocHome"
            value={formData.patient_name}
            onChange={handleChange}
          />
        </div>

            <div className="adjacent-field-DocHome">
          <label >Patient Age:</label>
          <input
            type="number"
            name="patient_age"
                className="input-DocHome"
            value={formData.patient_age}
            onChange={handleChange}
          />
        </div>

            <div className="adjacent-field-DocHome">
          <label>Patient Weight:</label>
          <input
            type="number"
            name="patient_weight"
                className="input-DocHome"
            value={formData.patient_weight}
            onChange={handleChange}
          />
        </div>

            <div className="adjacent-field-DocHome">
          <label>Patient Height:</label>
          <input
            type="number"
            name="patient_height"
                className="input-DocHome"
            value={formData.patient_height}
            onChange={handleChange}
          />
        </div>
          <div className="adjacent-field-DocHome">
            <label>Date:</label>
            <input
              type="text"
              name="patient_date"
              className="input-DocHome"
              value={formData.patient_height}
              onChange={handleChange}
            />
          </div>
        </div>
<div className="prescription">
            <div className="adjacent-field-DocHome-non">
          {/* <label>Prescription:</label> */}
          <textarea
            name="prescription"
                className="input-DocHome-prescription"
            value={formData.prescription}
            onChange={handleChange}
            placeholder="Write the prescription here."
          />
        </div>
        </div>
        <h3 className="mediH3">Medications Prescribed</h3>
        <form className="medi">
          <div className="medicineFlexBox">
          <div className="mediFlex">
            <label>Name of Medicine:</label>
            <input
              type="text"
              name="medicine_name"
              className="input-DocHome"
              value={formData.medicine_name}
              onChange={handleChange}
            />
          </div>
          <div className="mediFlex">
            <label className="mediFlexTwo">Dose of Medicine (per day):</label>
            <input
              type="text"
              name="medicine_dose"
              className="input-DocHome"
              value={formData.medicine_dose}
              onChange={handleChange}
            />
          </div>
          </div>
        </form>
        
<div className="btCenter">
        <button  className="submitBt-DocHome" type="submit">Submit</button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />{" "}
      </div>

  
  );
};

export default Home;
