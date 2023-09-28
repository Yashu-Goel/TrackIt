import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "http://localhost:5000";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [signupData, setSignupData] = useState({
    name: "",
    mobile: "",
    dob: "",
    blood_group: "", 
    age: "",
    password: "",
    cpassword: "", 
  });

  const [loginData, setLoginData] = useState({
    mobile: "",
    password: "",
  });

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE}/patient/patient_login`,
        loginData
      );
      console.log(response.data);
      toast.success("Login success!!");
    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error("Login failed", error);
    }
  };

  // Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE}/patient/patient_signup`,
        signupData
      );
      toast.success("Registered");
      console.log(response.data);
    } catch (error) {
      toast.error(error.message || "Signup failed");
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
      {isLogin ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={loginData.mobile}
              onChange={(e) => handleInputChange(e, "login")}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={(e) => handleInputChange(e, "login")}
            />

            <button type="submit">Login</button>
          </form>
          <p>
            {" "}
            Don't have an account?{" "}
            <button onClick={toggleAuthMode}>Register</button>
          </p>
        </div>
      ) : (
        <div>
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={signupData.name}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={signupData.mobile}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="text"
              id="dob"
              name="dob"
              value={signupData.dob}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <label htmlFor="blood_group">Blood Group:</label>{" "}
            {/* Match with the backend naming */}
            <input
              type="text"
              id="blood_group"
              name="blood_group"
              value={signupData.blood_group}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              value={signupData.age}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={signupData.password}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <label htmlFor="cpassword">Confirm Password:</label>{" "}
            {/* Match with the backend naming */}
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={signupData.cpassword}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <button type="submit">Signup</button>
          </form>
          <p>
            Already have an account?
            <button onClick={toggleAuthMode}>Login</button>
          </p>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Auth;
