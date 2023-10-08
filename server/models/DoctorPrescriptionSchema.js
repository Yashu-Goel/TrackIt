import mongoose from "mongoose";

const DoctorPrescriptionSchema = new mongoose.Schema({
  patient_name: {
    type: String,
    required: true,
  },
  patient_age: {
    type: String,
    required: true,
  },
  patient_weight: {
    type: String,
    required: true,
  },
  patient_height: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now()
  }
});



export default mongoose.model("DoctorPrescription", DoctorPrescriptionSchema);
