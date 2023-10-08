import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      // Assuming your backend returns the saved prescription
      console.log("Prescription saved:", response.data);

      // Clear form data on successful submission
      setFormData({
        patient_name: "",
        patient_age: "",
        patient_weight: "",
        patient_height: "",
        prescription: "",
      });

      // Show success notification
      toast.success("Prescription submitted successfully");
    } catch (error) {
      if (error.response && error.response.data) {
        // Show error notification
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
      <h2>Upload Prescription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Patient Age:</label>
          <input
            type="number"
            name="patient_age"
            value={formData.patient_age}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Patient Weight:</label>
          <input
            type="number"
            name="patient_weight"
            value={formData.patient_weight}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Patient Height:</label>
          <input
            type="number"
            name="patient_height"
            value={formData.patient_height}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Prescription:</label>
          <textarea
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />{" "}
    </div>
  );
};

export default Home;
