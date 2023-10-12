import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Components/logo_name_white.png";
import { DoctorContext } from "./DoctorProvide";
import { BiSolidUser } from "react-icons/bi";
import { Link } from "react-router-dom";


const Navbar = () => {
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const { isLoggedIn, logout } = useContext(DoctorContext);
        console.log(isLoggedIn);

      const handleUserClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

      const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
      };

  return (
    <div>
      <div className="header-navbar">
        <img src={logo} className="logo-navbar"></img>
        <div className="navbar">
          <BiSolidUser className="UserProfileLogo" onClick={handleUserClick} />
          {isDropdownOpen && (
            <div className="DoctorDropdownMenu">
              {isLoggedIn ? (
                <div onClick={handleLogout}>
                  Sign Out
                </div>
              ) : (
                <div>
                  <Link to="/doctor_auth">Login</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
