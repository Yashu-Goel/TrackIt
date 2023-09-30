import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar.js";
import "./Auth.css";

const API_BASE = "http://localhost:5000";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [signupData, setSignupData] = useState({
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    aadhar: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    mobileOrAadhar: "",
    password: "",
  });

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };
  //login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE}/patient/patient_login`,
        loginData
      );
      console.log(response);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Login success!!");
        setTimeout(() => {
          navigate("/");
        }, 3500);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      console.error("Login failed", error);
    }
  };

  //signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if(!signupData.name || !signupData.gender || !signupData.dob || !signupData.password || !signupData.cpassword || !signupData.mobile || !signupData.aadhar)
    {
      toast.info("Fill all details");
      return;
    }
    if(signupData.password.length<6)
    {
      toast.info("Minimum Length of Password must be 6");
      return;
    }
    if(signupData.password!=signupData.password)
    {
      toast.info("Password and Confirm Password must be same");
      return;
    }
    if (signupData.mobile.length > 10 || signupData.mobile.length < 10)
    {
      toast.info("Mobile Number must be of 10 digits");
      return;
    }
    if (signupData.aadhar.length > 12 || signupData.aadhar.length < 12)
    {
      toast.info("Aadhar Number must be of 12 digits");
      return;
    }
    const today = new Date();
    const dobDate = new Date(signupData.dob);
    if (dobDate > today) {
        toast.info("Date of Birth must not be a future date");
        return;
    }
      try {
        console.log("Sending signup data:", signupData);
        const response = await axios.post(
          `${API_BASE}/patient/patient_signup`,
          signupData
        );

        console.log("Signup response:", response);

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success("Registered");
          console.log(response.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Signup failed");
        console.error("Signup failed", error);
      }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;

    if (formType === "login") {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (formType === "signup") {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <Navbar />
      <div class="outContainer">
        <div class="container">
        {isLogin ? (
          <div>
            <h2>Welcome Back! Login Here.</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="mobileOrAadhar">Mobile Number or Aadhar:</label>
              <input
                type="text"
                id="mobileOrAadhar"
                name="mobileOrAadhar"
                class="input-field"
                minLength={10}
                value={loginData.mobileOrAadhar}
                onChange={(e) => handleInputChange(e, "login")}
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                class="input-field"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, "login")}
              />

                <button type="submit" class="log-button">Login</button>
            </form>
            <p>
               Don't have an account?            
              <button  class="switch-button" onClick={toggleAuthMode}>Register</button>
            </p>
          </div>
        ) : (
          <div>
            <h2>Welcome! Signup Here.</h2>
            <form onSubmit={handleSignup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                class="input-field"
                value={signupData.name}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                class="input-field"
                value={signupData.dob}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label>Gender:</label>
              <select
                id="gender"
                name="gender"
                class="input-field"
                value={signupData.gender}
                onChange={(e) => handleInputChange(e, "signup")}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              <label htmlFor="mobile">Mobile Number:</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                    class="input-field"
                value={signupData.mobile}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                    class="input-field"
                value={signupData.email}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label htmlFor="aadhar">Aadhar:</label>
              <input
                type="text"
                id="aadhar"
                name="aadhar"
                    class="input-field"
                value={signupData.aadhar}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                    class="input-field"
                value={signupData.password}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <label htmlFor="cpassword">Confirm Password:</label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                    class="input-field"
                value={signupData.cpassword}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <button type="submit" class="log-button">Signup</button>
            </form>
            <p>
              Already have an account?
                  <button className="switch-button"  onClick={toggleAuthMode}>Login</button>
            </p>
          </div>
        )}
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
