import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { DoctorContext } from "./DoctorProvide";
import {API_BASE} from "../functions"
import { toast } from "react-toastify";

const GetPatients = () => {
  const doctorId = localStorage.getItem("_id");
  const [patientsData, setPatientsData] = useState([]);
    const { isLoggedIn, toggleLoginStatus, logout } = useContext(DoctorContext);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
       if (!isLoggedIn) {
         toast.error("Please Login");
         return;
       }
        const response = await axios.get(API_BASE+`/doctor/patient_data/${doctorId}`);
        setPatientsData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        // Handle error, show a message to the user, etc.
      }
    };

    fetchData();
  }, [doctorId]);

  return (
    <div>
      <h1>Patients Data</h1>
      {patientsData.map((patient, index) => (
        <div key={index}>
          <h2>{patient.patient_name}</h2>
          <p>Age: {patient.patient_age}</p>
          <p>Weight: {patient.patient_weight}</p>
          <p>Height: {patient.patient_height}</p>
          <p>Prescription: {patient.prescription}</p>
          <p>Date: {new Date(patient.date).toLocaleDateString()}</p>
          <h3>Medicine Records:</h3>
          {patient.medicineRecords.map((medicine, idx) => (
            <div key={idx}>
              <p>Medicine Name: {medicine.medicineName}</p>
              <p>Morning Dose: {medicine.morningDose}</p>
              <p>Afternoon Dose: {medicine.afternoonDose}</p>
              <p>Evening Dose: {medicine.eveningDose}</p>
              <p>Total Days: {medicine.totalDays}</p>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default GetPatients;
