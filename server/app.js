import express from "express";
const app = express();
import cors from "cors";
import { connect } from "mongoose";
import { config } from "dotenv";
import patient from './router/patient.js'

console.log(process.env.DATABASE);
//Middleware
app.use(cors());
app.use("/patient", patient);

config();
connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("no connection: " + error);
  });

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});