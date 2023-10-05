import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import Navbar from './Components/Navbar'
 import logo1 from './onlyLogoBlk.png'
import txtlogo from './onlyTextBlk.png'


const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='forflex'>
      <div class="main-home">
        <img src={logo1} className='oneone'></img>
        <img src={txtlogo} className='twotwo'></img>
        <h4 className='three'>Centralised Reporting and Identification of Disease System</h4>
        <div class="four">
        <Link to="/patient_auth"><button className='but-home'>Patient</button></Link>
        <Link to="/doctor_auth"><button className='but-home'>Doctor</button></Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home