import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css";
// import logo from './steth.png'
import Navbar from './Components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar/>
      {/* Code here */}
      {/* <div class="header">
        <img src={logo}></img>
        <div class="lorem" >
          Lorem impsum
        </div>
      </div> */}
      <div class="main">
        <h1>TrackIt</h1>
        <hr />
        <div class="bt">
        <Link to="/patient_auth"><button>Patient</button></Link>
        <Link to="/patient_auth"><button>Doctor</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Home