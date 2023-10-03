import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "http://localhost:5000";
const Auth = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    dob: "",
    email: "",
    aadhar: "",
    field_of_study: "",
    past_experiences: "",
    degreeFile: null,
    clinic_location: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, degreeFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      mobile,
      dob,
      email,
      aadhar,
      field_of_study,
      past_experiences,
      degreeFile,
      clinic_location,
      password,
      cpassword,
    } = formData;

    try {
      const uploadUrlResponse = await axios.post(
        `${API_BASE}/doctor/get-upload-url`
      );

      const signedUrl = uploadUrlResponse.data.signedUrl;

      if (degreeFile) {
        await axios.put(signedUrl, degreeFile, {
          headers: {
            "Content-Type": degreeFile.type,
          },
        });
      }

      const signUpResponse = await axios.post(
        `${API_BASE}/doctor/doctor_signup`,
        {
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
          degreeFile: degreeFile ? degreeFile.name : null,
        }
      );

      console.log(signUpResponse.data); // Handle the response as needed
      toast.success("Signup successful!");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Error during signup");
      }
      console.error("Error during signup:", error);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          placeholder="Aadhar Number"
        />
        <input
          type="text"
          name="field_of_study"
          value={formData.field_of_study}
          onChange={handleChange}
          placeholder="Field of Study"
        />
        <input
          type="text"
          name="past_experiences"
          value={formData.past_experiences}
          onChange={handleChange}
          placeholder="Past Experiences"
        />
        <input
          type="file"
          name="degreeFile"
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={handleFileChange}
        />

        <input
          type="text"
          name="clinic_location"
          value={formData.clinic_location}
          onChange={handleChange}
          placeholder="Clinic Location"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="cpassword"
          value={formData.cpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        <button type="submit">Submit</button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Auth;
