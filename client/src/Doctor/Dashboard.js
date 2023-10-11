import React from 'react'
import Navbar from './Navbar'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import './Dashboard.css';
const Dashboard = () => {
  return (
    <div>
        <Navbar/>
        <div className='flexBox-Dash'>
            <LeftSidebar/>
            
            <div className='CenterMain'>
          <div>
            <h1 className='doctlounge'>DOCTOR'S LOUNGE</h1>
            <hr className='hrlounge'/>
          </div>
              
              <div className='centerBoxDash'>
          
                <h1>Access Current Patient's Record</h1>
            
                <form className='centerBox-form'>

                  <div className='formFlexDash'>
                  <label className='lll'>Mobile No :</label>
              <input
                type="text"
                name="mobile"
              />
              </div>
              <br />
              <div className='formFlexDash'>
              <label>OTP :</label>
              <input
              type='text'
              name='otp'
              />
              </div>
                </form>
              </div>
            </div>
            <RightSidebar />
        </div>
    </div>
  )
}

export default Dashboard