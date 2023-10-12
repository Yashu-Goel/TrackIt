import React, { createContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const isDoctorLoggedIn = localStorage.getItem("_id");
      if (isDoctorLoggedIn) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const logout = () => {
    localStorage.removeItem("_id");
    setIsLoggedIn(false);
    toast.info("Logging out...");
    setTimeout(() => {
      navigate("/doctor_auth");
    }, 2200);
  };

  // Wait until loading is complete before rendering children
  if (isLoading) {
    return null; // or some loading indicator
  }

  return (
    <>
      <div>
        <DoctorContext.Provider
          value={{ isLoggedIn, toggleLoginStatus, logout }}
        >
          {children}
        </DoctorContext.Provider>
      </div>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
};

export default DoctorProvider;
export { DoctorContext };
