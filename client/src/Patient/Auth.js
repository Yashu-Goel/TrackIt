import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div>
      {isLogin ? (
        <div>
          <h2>Login</h2>
          <form>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input type="text" id="mobileNumber" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />

            <button type="submit">Login</button>
          </form>
          <p onClick={toggleAuthMode}>Register Here</p>
        </div>
      ) : (
        <div>
          <h2>Signup</h2>
          <form>
            <label htmlFor="patientName">Patient Name:</label>
            <input type="text" id="patientName" />

            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input type="text" id="mobileNumber" />

            <label htmlFor="dob">Date of Birth:</label>
            <input type="text" id="dob" />

            <label htmlFor="bloodGroup">Blood Group:</label>
            <input type="text" id="bloodGroup" />

            <label htmlFor="age">Age:</label>
            <input type="text" id="age" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" />

            <button type="submit">Signup</button>
          </form>
          <p onClick={toggleAuthMode}>Already Registered</p>
        </div>
      )}
    </div>
  );
};

export default Auth;
