import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { DoctorContext } from "./DoctorProvide";
import {API_BASE} from "../functions"
import { toast } from "react-toastify";
import Navbar from './Navbar'
import './GetPatients.css';

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
        console.log(response);
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
      <Navbar />
      <h1 className="getpatients-h1">Past Patients Data</h1>
      <table className="getpatients-table">
        <thead>
        <tr>
          <th>Patient ID</th>
          <th>NAME</th>
          <th>AGE</th>
          <th>WEIGHT</th>
          <th>HEIGHT</th>
          <th>Last Appointment Date</th>
        </tr>
        </thead>
        <tbody>
          {patientsData.map((patient, index) => (
        <tr key={index}>
          <td>{patient._id}</td>
          <td>{patient.patient_name}</td>
          <td>{patient.patient_age}</td>
          <td>{patient.patient_weight}</td>
          <td>{patient.patient_height}</td>
          {/* <p>Prescription: {patient.prescription}</p> */}
          <td>{new Date(patient.date).toLocaleDateString()}</td>
          {/* <h3>Medicine Records:</h3>
          {patient.medicineRecords.map((medicine, idx) => (
            <div key={idx}>
              <p>Medicine Name: {medicine.medicineName}</p>
              <p>Morning Dose: {medicine.morningDose}</p>
              <p>Afternoon Dose: {medicine.afternoonDose}</p>
              <p>Evening Dose: {medicine.eveningDose}</p>
              <p>Total Days: {medicine.totalDays}</p>
            </div>
          ))} */}
          {/* <hr /> */}
        </tr>
      ))}

        </tbody>
      </table>
      
    </div>
  );
};

export default GetPatients;
