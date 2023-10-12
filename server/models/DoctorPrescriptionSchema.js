import mongoose from "mongoose";

const MedicineRecordSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  morningDose: {
    type: String,
    required: true,
  },
  afternoonDose: {
    type: String,
    required: true,
  },
  eveningDose: {
    type: String,
    required: true,
  },
  totalDays: {
    type: String,
    required: true,
  },
});

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
  medicineRecords: {
    type: [MedicineRecordSchema],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
});

export default mongoose.model("DoctorPrescription", DoctorPrescriptionSchema);
