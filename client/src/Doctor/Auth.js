import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar.js";
import "./Auth.css";
import logo from "./profile.png";

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
    const name = e.target.name;
    const file = e.target.files[0];

    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const isValidAadhar = (aadhar) => /^\d+$/.test(aadhar);

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();

    if (
      today.getMonth() < dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() &&
        today.getDate() < dobDate.getDate())
    ) {
      return age - 1;
    }

    return age;
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
      profilePic,
      clinic_location,
      password,
      cpassword,
    } = formData;

    if (
      !name ||
      !mobile ||
      !dob ||
      !email ||
      !aadhar ||
      !field_of_study ||
      !past_experiences ||
      !degreeFile ||
      !profilePic ||
      !clinic_location ||
      !password ||
      !cpassword
    ) {
      toast.info("Please fill in all fields");
      return;
    }

    if (aadhar.length !== 12 || !isValidAadhar(aadhar)) {
      toast.info("Aadhar number must be 12 numeric characters");
      return;
    }
    if(mobile.length!==10 || !isValidAadhar(mobile))
    {
      toast.info("Mobile number must be 10 numeric characters");
      return;
    }
    const age = calculateAge(dob);
    if (age < 18) {
      toast.info("You must be at least 18 years old to register");
      return;
    }
    if(password.length<6 || cpassword.length<6)
    {
      toast.info("Password Length must be 6")
    }
    if (password !== cpassword) {
      toast.info("Passwords do not match");
      return;
    }

    try {
      const uploadUrlResponseDegreeFile = await axios.post(
        `${API_BASE}/doctor/get-upload-url`
      );
      const uploadUrlResponseProfilePic = await axios.post(
        `${API_BASE}/doctor/get-upload-url2`
      );
      //doctor
      const degreeFileUniqueName =
        uploadUrlResponseDegreeFile.data.uniqueFilename;
      const signedUrlDegreeFile = uploadUrlResponseDegreeFile.data.signedUrl;

      //profile pic
      const profilePicUniqueName =
        uploadUrlResponseProfilePic.data.uniqueFilename;
      const signedUrlProfilePic = uploadUrlResponseProfilePic.data.signedUrl;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("dob", dob);
      formData.append("email", email);
      formData.append("aadhar", aadhar);
      formData.append("field_of_study", field_of_study);
      formData.append("past_experiences", past_experiences);
      formData.append("clinic_location", clinic_location);
      formData.append("password", password);
      formData.append("cpassword", cpassword);
      formData.append("degreeFile", degreeFileUniqueName);
      formData.append("profilePic", profilePicUniqueName);
      await axios.put(signedUrlDegreeFile, degreeFile, {
        headers: {
          "Content-Type": degreeFile.type,
        },
      });
      await axios.put(signedUrlProfilePic, profilePic, {
        headers: {
          "Content-Type": degreeFile.type,
        },
      });

      await axios.post(`${API_BASE}/doctor/doctor_signup`, {
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
        degreeFile: degreeFileUniqueName,
        profilePic: profilePicUniqueName,
      });

      toast.success("Signup successful!");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error || "Error during signup");
      } else {
        toast.error("Error during signup");
      }
      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div class="outContainer-doctor">
        <div class="container-doctor">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="two">
              <div className="adjacent-field">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  class="input-field-doctor"
                />
              </div>

              <div className="adjacent-field">
                <label>Mobile:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  class="input-field-doctor"
                />
              </div>

              <div className="adjacent-field">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  class="input-field-doctor"
                />
              </div>

              <div className="adjacent-field">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  class="input-field-doctor"
                />
              </div>

              <div className="adjacent-field">
                <label>Aadhar:</label>
                <input
                  type="text"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  placeholder="Aadhar Number"
                  class="input-field-doctor"
                />
              </div>

              <div className="adjacent-field">
                <label>Field of Study:</label>
                <input
                  type="text"
                  name="field_of_study"
                  value={formData.field_of_study}
                  onChange={handleChange}
                  placeholder="Field of Study"
                  class="input-field-doctor"
                />
              </div>

              <div className="adjacent-field">
                <label>Past Experiences:</label>
                <input
                  type="text"
                  name="past_experiences"
                  value={formData.past_experiences}
                  onChange={handleChange}
                  placeholder="Past Experiences"
                  class="input-field-doctor"
                />
              </div>

              <div className="adjacent-field">
                <label>Clinic Location:</label>
                <input
                  type="text"
                  name="clinic_location"
                  value={formData.clinic_location}
                  onChange={handleChange}
                  placeholder="Clinic Location"
                  class="input-field-doctor"
                />
              </div>

              <div className="adjacent-field">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  class="input-field-doctor"
                />
              </div>

              <div className="adjacent-field">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="cpassword"
                  value={formData.cpassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  class="input-field-doctor"
                />
              </div>
              <div className="adjacent-field">
                <label>Upload Degree </label>

                <input
                  id="photo-upload"
                  type="file"
                  name="degreeFile"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="log-button-doctor ">
                Submit
              </button>
            </div>

            <div className="one">
              <label className="custom-file-upload">
                <div className="img-wrap">
                  <img for="photo-upload" src={logo} className="profile-img" />
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  name="profilePic"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="colored"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
