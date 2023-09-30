import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Doctor from "../models/DoctorAuthSchema.js";
dotenv.config();
const router = express.Router();
const JWT_Secret = process.env.JWT_Secret;

router.use(express.json());
router.use(cors());

router.get("/", (req, res) => {
  res.send("Aur kya kar rahe ho yaha?");
});
//doctor signup
router.post("/doctor_signup", async (req, res) => {
  console.log(req.body);
  const {
    name,
    mobile,
    dob,
    email,
    aadhar,
    field_of_study,
    past_experiences,
    degree,
    clinic_location,
    password,
    cpassword
  } = req.body;
  if (
    !name ||
    !dob ||
    !mobile ||
    !email ||
    !aadhar ||
    !field_of_study||
    !past_experiences ||
    !degree ||
    !clinic_location ||
    !password ||
    !cpassword
  ) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }
  try {
    const doctorExistsByMobile = await Doctor.findOne({ mobile: mobile });
    const doctorExistsByAadhar = await Doctor.findOne({ aadhar: aadhar });

    if (doctorExistsByMobile || doctorExistsByAadhar) {
      return res.status(422).json({ error: "Doctor already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({
        error: "Password and Confirm Password must be the same!",
      });
    } else {
      const doctor = await Doctor.create({
        name,
        mobile,
        dob,
        email,
        aadhar,
        field_of_study,
        past_experiences,
        degree,
        clinic_location,
        password,
        cpassword,
      });

      if (doctor) {
        return res.status(200).json({
          _id: doctor._id,
          name: doctor.name,
          mobile: doctor.mobile,
          message: "Doctor registered successfully",
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
// router.post("/doctor_login", async (req, res) => {
//   try {
//     const details = req.body;
//     console.log(req.body);

//     const { mobile, password } = details;
//     if (!mobile || !password) {
//       return res.status(400).json({ error: "Please fill all the details" });
//     }
//     const patient = await Patient.findOne({ mobile });
//     console.log("patient: " + patient);
//     if (patient) {
//       const isMatch = await bcrypt.compare(password, patient.password);
//       if (!isMatch) {
//         res.json({ message: "Invalid Credential" });
//       } else {
//         const token = jwt.sign({ _id: patient._id }, JWT_Secret);
//         res.json({
//           token: token,
//           _id: patient._id,
//           message: "Login Success!!",
//         });
//       }
//     } else {
//       res.status(400).send("Invalid Credentials");
//     }
//   } catch (error) {
//     console.log("error: " + error);
//   }
// });
export default router;
