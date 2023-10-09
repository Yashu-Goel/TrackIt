import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const DoctorContext= createContext();
const DoctorProvider =({children})=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const isDoctorLoggedIn = localStorage.getItem("_id");
        if(isDoctorLoggedIn)
        {
            setIsLoggedIn(true);
        }
    },[]);

const toggleLoginStatus = () => {
  setIsLoggedIn(!isLoggedIn);
};
const logout = () => {
  localStorage.removeItem("_id");
  setIsLoggedIn(false);
  toast.info("Logging out...");
  setTimeout(() => {
    navigate("/seller");
  }, 3000);
};

return (
    <div>
        <DoctorContext.Provider value={{isLoggedIn, toggleLoginStatus,logout}}>
            {children}
        </DoctorContext.Provider>
    </div>
)
}
export default DoctorProvider;
export {DoctorContext};