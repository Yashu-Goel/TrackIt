import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { DoctorContext } from "./DoctorProvide.js";
import "./AddPatientPrescription.css";
import {API_BASE} from "../functions"
const AddPatientPrescription = () => {
  const { isLoggedIn, toggleLoginStatus, logout } = useContext(DoctorContext);
  const _id = localStorage.getItem("_id");
  const [doctorData, setDoctorData] = useState({
    doctor_name: "",
    clinic_address: {
      street: "",
      city: "",
      state: "",
      pin_code: "",
    },
  });
  const [medicineData, setMedicineRecords] = useState({
    medicineName: "",
    morningDose: "",
    afternoonDose: "",
    eveningDose: "",
    totalDays: "",
  });
  const [patientData, setPatientData] = useState({
    patient_name:"",
    patient_age:"",

  });
  const [medicineRecords, setPrescriptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineRecords({
      ...medicineData,
      [name]: value,
    });
  };
  const handleAddRow = () => {
    const validatedMedicineData = {
      medicineName: medicineData.medicineName,
      morningDose:
        medicineData.morningDose === ""
          ? 0
          : parseInt(medicineData.morningDose),
      afternoonDose:
        medicineData.afternoonDose === ""
          ? 0
          : parseInt(medicineData.afternoonDose),
      eveningDose:
        medicineData.eveningDose === ""
          ? 0
          : parseInt(medicineData.eveningDose),
      totalDays: medicineData.totalDays,
    };

    setPrescriptions([...medicineRecords, validatedMedicineData]);

    setMedicineRecords({
      medicineName: "",
      morningDose: "",
      afternoonDose: "",
      eveningDose: "",
      totalDays: "",
    });
  };



  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        if(!_id)
        {
          toast.error("Kindly Login First!!")
          return;
        }
        const response = await axios.get(
          API_BASE + `/doctor/doctor_info/${_id}`
        );
        const { data } = response;

        setDoctorData({
          doctor_name: data.name,
          clinic_address: data.clinic_address,
        });
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [_id]);

  const [formData, setFormData] = useState({
    patient_id: "",
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
        API_BASE + "/doctor/upload_prescription",
        {
          patient_weight: formData.patient_weight,
          patient_height: formData.patient_height,
          prescription: formData.prescription,
          medicineRecords: medicineRecords,
          doctorId: _id
        }
      );

      console.log("Prescription saved:", response.data);

      setFormData({
        patient_id: "",
        patient_weight: "",
        patient_height: "",
        prescription: "",
      });

      setPrescriptions([]);

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
  //age calculator
   const calculateAge = (dob) => {
     const birthDate = new Date(dob);
     const today = new Date();
     const age = today.getFullYear() - birthDate.getFullYear();
     const monthDiff = today.getMonth() - birthDate.getMonth();

     if (
       monthDiff < 0 ||
       (monthDiff === 0 && today.getDate() < birthDate.getDate())
     ) {
       return age - 1;
     } else {
       return age;
     }
   };
  //find patient from id
const handlePatient = async () => {
  const id = formData.patient_id;
  if(!id)
  {
    toast.info("Enter Patient Id")
    return;
  }
  try {
    const response = await axios.get(API_BASE + `/patient/patient_data/${id}`);
    const patient = response.data;

    if (!patient) {
      toast.info("Patient not registered!!")
      return;
    }
    console.log(patient);
    setPatientData({
      patient_name: patient.name,
      patient_age: calculateAge(patient.dob),
    });
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <Navbar />
      <div className="header-DocHome">
        <h1>{doctorData.doctor_name}</h1>
        <p className="address">
          {doctorData.clinic_address.street}, {doctorData.clinic_address.city},
          {doctorData.clinic_address.state} -
          {doctorData.clinic_address.pin_code}
        </p>
        <hr className="hrr" />
      </div>
      <div className="adjacent-field-DocHome">
        <label>Patient Id:</label>
        <input
          type="text"
          name="patient_id"
          className="input-DocHome"
          value={formData.patient_id}
          onChange={handleChange}
        />
        <button onClick={handlePatient}>Find Patient</button>
        <div>
          {patientData && (
            <div>
              <h2>Name: {patientData.patient_name}</h2>
              <p>Age: {patientData.patient_age}</p>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="forFlex-DocHome">
          <div className="adjacent-field-DocHome">
            <label>Patient Weight(kg):</label>
            <input
              type="number"
              name="patient_weight"
              className="input-DocHome"
              value={formData.patient_weight}
              onChange={handleChange}
            />
          </div>

          <div className="adjacent-field-DocHome">
            <label>Patient Height(cm):</label>
            <input
              type="number"
              name="patient_height"
              className="input-DocHome"
              value={formData.patient_height}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="prescription">
          <div className="adjacent-field-DocHome-non">
            <textarea
              name="prescription"
              className="input-DocHome-prescription"
              value={formData.prescription}
              onChange={handleChange}
              placeholder="Write the prescription here."
            />
          </div>
        </div>
        <hr className="hrr" />
        <h3 className="mediH3">Medications Prescribed</h3>
        <form className="medi">
          <div className="medicineFlexBoxone">
            <div className="mediFlex">
              <label>Name of Medicine:</label>
              <input
                type="text"
                name="medicineName"
                className="input-DocHome"
                value={medicineData.medicineName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mediFlex">
              <label className="mediFlexTwo">Dose of Medicine (per day):</label>
            </div>
          </div>
          <div className="medicineFlexBox">
            <div className="mediFlex">
              <label>Morning :</label>
              <input
                type="number"
                name="morningDose"
                className="input-DocHome"
                value={medicineData.morningDose}
                onChange={handleInputChange}
              />
            </div>
            <div className="mediFlex">
              <label>Afternoon :</label>
              <input
                type="number"
                name="afternoonDose"
                className="input-DocHome"
                value={medicineData.afternoonDose}
                onChange={handleInputChange}
              />
            </div>
            <div className="mediFlex">
              <label>Night :</label>
              <input
                type="number"
                name="eveningDose"
                className="input-DocHome"
                value={medicineData.eveningDose}
                onChange={handleInputChange}
              />
            </div>
            <div className="mediFlex">
              <label>Total Days:</label>
              <input
                type="number"
                name="totalDays"
                className="input-DocHome"
                value={medicineData.totalDays}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="button" onClick={handleAddRow} className="btmed">
            Add Medicine
          </button>
        </form>

        <table className="mediTable">
          <thead>
            <tr>
              <th>Name of Medicine</th>
              <th>Morning</th>
              <th>Afternoon</th>
              <th>Night</th>
              <th>Total Days</th>
            </tr>
          </thead>
          <tbody>
            {medicineRecords.map((prescription, index) => (
              <tr key={index}>
                <td>{prescription.medicineName}</td>
                <td>{prescription.morningDose}</td>
                <td>{prescription.afternoonDose}</td>
                <td>{prescription.eveningDose}</td>
                <td>{prescription.totalDays}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="btCenter">
          <button className="submitBt-DocHome" type="submit">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />{" "}
    </div>
  );
};

export default AddPatientPrescription;
