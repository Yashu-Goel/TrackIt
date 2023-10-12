import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Doctor from "../models/DoctorAuthSchema.js";
import uniqueFilename from "unique-filename";
import DoctorPrescription from "../models/DoctorPrescriptionSchema.js"
dotenv.config();
const router = express.Router();
const JWT_Secret = process.env.JWT_Secret;
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

router.use(express.json());
router.use(cors());

router.get("/", (req, res) => {
  res.send("Aur kya kar rahe ho yaha?");
});

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

async function putObject(key, contentType, folder) {
  const fullKey = folder ? `${folder}/${key}` : key;

  const command = new PutObjectCommand({
    Bucket: "crids",
    Key: fullKey,
    ContentType: contentType,
  });
  const url = await getSignedUrl(client, command);
  return url;
}

router.post("/get-upload-url", async (req, res) => {
  try {

    const uniqueImageName = uniqueFilename("", "image");
    const folder = "Doctor_Degree";
    const signedUrl = await putObject(uniqueImageName, "image/jpg/png",folder);
    console.log(signedUrl);
    res.status(200).json({ signedUrl, uniqueFilename: uniqueImageName });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Unable to generate signed URL" });
  }
});
router.post("/get-upload-url2", async (req, res) => {
  try {

    const uniqueImageName = uniqueFilename("", "image");
    const folder = "Doctor_Profile_Pic";
    const signedUrl = await putObject(uniqueImageName, "image/jpg/png",folder);
    console.log("2: "+signedUrl);
    res.status(200).json({ signedUrl, uniqueFilename: uniqueImageName });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Unable to generate signed URL" });
  }
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
    clinic_address, 
    password,
    cpassword,
    degreeFile,
    profilePic,
  } = req.body;

  if (
    !name ||
    !dob ||
    !mobile ||
    !email ||
    !aadhar ||
    !field_of_study ||
    !past_experiences ||
    !clinic_address || 
    !password ||
    !cpassword ||
    !degreeFile ||
    !profilePic
  ) {
    return res.status(422).json({
      error: "Please fill in all the fields including the degree document",
    });
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
        degreeFile,
        profilePic,
        clinic_address, 
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

//Login Doctor
router.post("/doctor_login", async (req, res) => {
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

    const doctor = await Doctor.findOne(fieldToSearch);
    console.log("doctor: " + doctor);

    if (doctor) {
      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        // Update: Send a proper error message for incorrect password
        return res.status(401).json({ error: "Invalid Credentials" });
      } else {
        const token = jwt.sign({ _id: doctor._id }, JWT_Secret);
        return res.json({
          token: token,
          _id: doctor._id,
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

//upload patient data from doctor page
router.post("/upload_prescription", async (req, res) => {
  console.log(req.body);
  try {
    const {
      patient_name,
      patient_age,
      patient_weight,
      patient_height,
      prescription,
      medicineRecords,
      doctorId
    } = req.body;

    if (
      !patient_name ||
      !patient_age ||
      !patient_weight ||
      !patient_height ||
      !prescription ||
      !medicineRecords ||
      !Array.isArray(medicineRecords)
    ) {
      return res
        .status(400)
        .json({
          error:
            "All fields are required, and medicineRecords must be an array",
        });
    }

    const newPrescription = new DoctorPrescription({
      patient_name,
      patient_age,
      patient_weight,
      patient_height,
      prescription,
      medicineRecords,
      doctorId,
    });

    // Validate the new prescription data
    const validationError = newPrescription.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    const savedPrescription = await newPrescription.save();

    res.status(201).json(savedPrescription);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//get doctor info from id
router.get("/doctor_info/:id", async (req, res) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const doctorInfo = {
      _id: doctor._id,
      name: doctor.name,
      clinic_address:doctor.clinic_address,
    };

    return res.status(200).json(doctorInfo);
  } catch (error) {
    console.error("Error fetching doctor information:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//get patient data from doctor id
router.get("/patient_data/:id", async(req,res)=>{
  try {
    const doctorId = req.params.id;
    const prescription = await DoctorPrescription.find({doctorId: doctorId});
    if(!prescription){
      return res.status(404).json({ error: "Prescription not found" });
    }
    res.status(200).json(prescription);

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }

})

export default router;
