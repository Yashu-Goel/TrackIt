import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Patient from "../models/PatientAuthSchema.js";
dotenv.config();
const router = express.Router();
const JWT_Secret = process.env.JWT_Secret;

router.use(express.json());
router.use(cors());

router.get("/", (req, res) => {
  res.send("Aur kya kar rahe ho yaha?");
});
//patient signup
router.post("/patient_signup", async (req, res) => {
  try {
    console.log("Received signup request:", req.body);
    const { name, dob, gender, mobile, email, aadhar, password, cpassword } =
      req.body;

    if (
      !name ||
      !dob ||
      !gender ||
      !mobile ||
      !email ||
      !aadhar ||
      !password ||
      !cpassword
    ) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const patientExistsByMobile = await Patient.findOne({ mobile: mobile });
    const patientExistsByAadhar = await Patient.findOne({ aadhar: aadhar });

    if (patientExistsByMobile || patientExistsByAadhar) {
      return res.status(422).json({ error: "Patient already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({
        error: "Password and Confirm Password must be the same!",
      });
    } else {
      const patient = await Patient.create({
        name,
        dob,
        gender,
        mobile,
        email,
        aadhar,
        password,
        cpassword,
      });


      if (patient) {
        return res.status(200).json({
          _id: patient._id,
          name: patient.name,
          mobile: patient.mobile,
          message: "Patient registered successfully",
        });
      } else {
        return res.status(400).json("Signup failed");
      }
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


//Login for Patient
router.post("/patient_login", async (req, res) => {
  try {
    const details = req.body;
    console.log(req.body);

    const { mobileOrAadhar, password } = details;
    if (!mobileOrAadhar || !password) {
      return res.status(400).json({ error: "Please fill all the details" });
    }

    const isMobile = /^\d{10}$/.test(mobileOrAadhar);
    const fieldToSearch = isMobile
      ? { mobile: mobileOrAadhar }
      : { aadhar: mobileOrAadhar };
    console.log(fieldToSearch);

    const patient = await Patient.findOne(fieldToSearch);
    console.log("patient: " + patient);

    if (patient) {
      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
        // Update: Send a proper error message for incorrect password
        return res.status(401).json({ error: "Invalid Credentials" });
      } else {
        const token = jwt.sign({ _id: patient._id }, JWT_Secret);
        return res.json({
          token: token,
          _id: patient._id,
          message: "Login Success!!",
        });
      }
    } else {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
