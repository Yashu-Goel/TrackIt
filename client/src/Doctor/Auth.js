import React, { useState } from "react";
import axios from "axios";
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
    const { name, value, files } = e.target;

    if (name === "degreeFile") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "degreeFile") {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    console.log("FormData before axios.post:", formDataToSend);

    try {
      const response = await axios.post(
        API_BASE + "/doctor/doctor_signup",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
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
          onChange={handleChange}
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
    </div>
  );
};

export default Auth;
