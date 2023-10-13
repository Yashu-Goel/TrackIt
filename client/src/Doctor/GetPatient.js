import React from 'react'

const GetPatient = () => {
  return (
    <div>
      hiiii
          {/* {patientsData.map((patient, index) => (
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
          ))} */}
    </div>
  )
}

export default GetPatient
