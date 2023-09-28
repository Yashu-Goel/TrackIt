import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();
const JWT_Secret = process.env.JWT_Secret;

router.use(express.json());
router.use(cors());


export default router;
