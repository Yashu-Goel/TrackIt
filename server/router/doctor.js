import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Doctor from "../models/DoctorAuthSchema.js";
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
    const folder = "Doctor_Degree";
    const key = `${Date.now()}.jpg`;
    const signedUrl = await putObject(key, "image/jpg/png", folder);
    console.log(signedUrl);
    res.status(200).json({ signedUrl });
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
    clinic_location,
    password,
    cpassword,
  } = req.body;

  const degreeFile = req.body.degreeFile;
  console.log(degreeFile);

  if (
    !name ||
    !dob ||
    !mobile ||
    !email ||
    !aadhar ||
    !field_of_study ||
    !past_experiences ||
    !clinic_location ||
    !password ||
    !cpassword ||
    !degreeFile
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
      const degreeKey = `${Date.now()}_${degreeFile.originalname}`;
      const folder = "Doctor_Degree";

      // Use the putObject function for image upload
      const signedUrl = await putObject(degreeKey, degreeFile.mimetype, folder);
      const uploadResult = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": degreeFile.mimetype,
        },
        body: degreeFile.buffer,
      });

      if (!uploadResult.ok) {
        throw new Error("Failed to upload degree document");
      }

      const doctor = await Doctor.create({
        name,
        mobile,
        dob,
        email,
        aadhar,
        field_of_study,
        past_experiences,
        degree: degreeKey,
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






export default router;
