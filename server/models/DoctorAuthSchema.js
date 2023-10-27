import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const DoctorAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: false,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  aadhar: {
    type: String,
    required: true,
    unique: false,
  },
  field_of_study: {
    type: String,
    required: true,
  },
  past_experiences: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  degreeFile: {
    type: String,
    required: true,
  },
  clinic_address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pin_code: {
      type: String,
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
});

// Password hashing
DoctorAuthSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

export default mongoose.model("Doctor", DoctorAuthSchema);
