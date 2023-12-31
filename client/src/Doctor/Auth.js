import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar.js";
import { DoctorContext } from "./DoctorProvide.js";
import "./Auth.css";
import logo from "./profile.png";
import { API_BASE } from "../functions.js";
const Auth = () => {
  const { isLoggedIn, toggleLoginStatus, logout } = useContext(DoctorContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    mobileOrAadhar: "",
    password: "",
  });
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    dob: "",
    email: "",
    aadhar: "",
    field_of_study: "",
    past_experiences: "",
    degreeFile: null,
    profilePic: null,
    street: "",
    city: "",
    state: "",
    pin_code: "",
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
      street,
      city,
      state,
      pin_code,
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
      !street ||
      !city ||
      !state ||
      !pin_code ||
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
    if (mobile.length !== 10 || !isValidAadhar(mobile)) {
      toast.info("Mobile number must be 10 numeric characters");
      return;
    }
    const age = calculateAge(dob);
    if (age < 18) {
      toast.info("You must be at least 18 years old to register");
      return;
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
      formData.append("street", street);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("pin_code", pin_code);
      formData.append("password", password);
      formData.append("cpassword", cpassword);
      formData.append("degreeFile", degreeFileUniqueName);
      formData.append("profilePic", profilePicUniqueName);
      console.log(profilePicUniqueName);

      await axios.put(signedUrlDegreeFile, degreeFile, {
        headers: {
          "Content-Type": degreeFile.type,
        },
      });
      console.log(profilePicUniqueName);


      await axios.put(signedUrlProfilePic, profilePic, {
        headers: {
          "Content-Type": profilePic.type,
        },
      }); 
      const res = await axios.post(API_BASE+"/doctor/doctor_signup", {
        name,
        mobile,
        dob,
        email,
        aadhar,
        field_of_study,
        past_experiences,
        clinic_address: {
          street,
          city,
          state,
          pin_code,
        },
        password,
        cpassword,
        degreeFile: degreeFileUniqueName,
        profilePic: profilePicUniqueName,
      });
      console.log(res.data);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
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
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE}/doctor/doctor_login`,
        loginData
      );
      console.log(response);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Login success!!");
        const { _id, token } = response.data;
        localStorage.setItem("_id", _id);
        toggleLoginStatus();
        setTimeout(() => {
          navigate("/doctor_dashboard");
        }, 3500);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      console.error("Login failed", error);
    }
  };
  return (
    <div>
      <Navbar />
      {/* <div class="outContainer-doctor">
        <div class="container-doctor"> */}
      {isLogin ? (
        <div class="outContainer-doctor-login">
          <div class="container-doctor-login">
            {/* <div> */}
            <h2>Welcome Back! Login Here.</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="mobileOrAadhar">Mobile Number or Aadhar:</label>
              <input
                type="text"
                id="mobileOrAadhar"
                name="mobileOrAadhar"
                class="input-field-doctor-login"
                minLength={10}
                value={loginData.mobileOrAadhar}
                onChange={(e) => handleInputChange(e, "login")}
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                class="input-field-doctor-login"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, "login")}
              />

              <button type="submit" class="log-button-patient">
                Login
              </button>
            </form>
            <p className="demo">
              Don't have an account?
              <button class="switch-button-patient" onClick={toggleAuthMode}>
                Register
              </button>
            </p>
          </div>
        </div>
      ) : (
        // </div>
        <div class="outContainer-doctor">
          <div class="container-doctor">
            <div>
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
                    <label>Street:</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="Street"
                      class="input-field-doctor"
                    />
                  </div>

                  <div className="adjacent-field">
                    <label>City:</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      class="input-field-doctor"
                    />
                  </div>

                  <div className="adjacent-field">
                    <label>State:</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      class="input-field-doctor"
                    />
                  </div>

                  <div className="adjacent-field">
                    <label>Pin Code:</label>
                    <input
                      type="text"
                      name="pin_code"
                      value={formData.pin_code}
                      onChange={handleChange}
                      placeholder="Pin Code"
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
                      <img
                        for="photo-upload"
                        src={logo}
                        className="profile-img"
                      />
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
              <p>
                Already have an account?
                <button
                  className="switch-button-patient"
                  onClick={toggleAuthMode}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
    //   </div>
    // </div>
  );
};

export default Auth;
