import React from 'react'
import { Link } from "react-router-dom";
import './LeftSidebar.css'
import logo from "./profile.png";

const LeftSidebar = () => {
    const data = [
      {
        data_item: "Patient Data",
        link_to: "/patient_prescription",
      },
      {
        data_item: "Add Patient Prescription",
        link_to: "/patient_prescription",
      },
      {
        data_item: "Patients",
        link_to: "/patients",
      },
      
    ];
  return (
    <div className="DashboardLeftSideBarMain">
      <div className="DataItems">
        <div className="img-wrap-Dash">
          <img
            for="photo-upload"
            src={logo}
            className="profile-img-Dash"
          />
        </div>
        <div className='docname-dash'>
          <p>Doctor's Name</p>
        </div>
        <div>
          {data.map((item, index) => (
            <Link to={item.link_to} key={index} className="LinkStyle">
              <div className="DataItem">
                <p>{item.data_item}</p>
                <span>&gt;</span>
              </div>
            </Link>

          ))}
        </div>
  
      </div>
    </div>
  );
}

export default LeftSidebar