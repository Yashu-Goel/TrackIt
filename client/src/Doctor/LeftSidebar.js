import React from 'react'
import { Link } from "react-router-dom";
import './LeftSidebar.css'
const LeftSidebar = () => {
    const data = [
      {
        data_item: "Add Patient Prescription",
        link_to: "/patient_prescription",
      },
      
    ];
  return (
    <div className="SellerLeftSideBarMain">
      <div className="DataItems">
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
  );
}

export default LeftSidebar