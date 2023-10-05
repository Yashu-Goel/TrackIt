import React from 'react'
import "./Navbar.css";
import logo from './logo_name_white.png'

const Navbar = () => {
    return (
        <div>
            {/* Code here */}
            <div class="header-navbar">
                <img src={logo} className='logo-navbar'></img>
                <div class="lorem-navbar" >
                    Centralised Reporting and Identification of Disease System
                </div>
            </div>
        </div>
    )
}

export default Navbar