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
router.post("/patient_signup", async(req, res) => {
  console.log(req.body);
  const { name, mobile, dob, blood_group, age, password, cpassword } = req.body;
  if (!name || !mobile || !dob || !blood_group || !age || !password || !cpassword) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  try {
    const PatientExists = await Patient.findOne({ mobile: mobile });

    if (PatientExists) {
      return res.status(422).json("Patient already Exists");
    } else if (password != cpassword) {
      return res.status(422).json({
        error: "Password and Confirm Password must be the same!",
      });
    } else {
      const patient = await Patient.create({
        name,
        mobile,
        dob,
        blood_group,
        age,
        password,
        cpassword,
      });

      if (patient) {
        res.status(200).json({
          _id: patient._id,
          name: patient.name,
          mobile: patient.mobile,
          message: "Patient registered successfully",
        });
      } else res.status(400).json("Signup failed");
    }
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

//Login for Patient
router.post("/patient_login", async (req, res) => {
  try {
    const details = req.body;
    console.log(req.body);

    const { mobile, password } = details;
    if (!mobile || !password) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
    const patient = await Patient.findOne({ mobile });
    console.log("patient: " + patient);
    if (patient) {
      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
        res.json({ message: "Invalid Credential" });
      } else {
        const token = jwt.sign({ _id: patient._id }, JWT_Secret);
        res.json({
          token: token,
          _id: patient._id,
          message: "Login Success!!",
        });
      }
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    console.log("error: " + error);
  }
});
export default router;
