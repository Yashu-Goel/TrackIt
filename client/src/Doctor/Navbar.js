import React from 'react'
import "./Navbar.css";
import logo from '../Components/logo_name_white.png'

const Navbar = () => {
    return (
        <div>
            <div class="header-navbar">
                <img src={logo} className='logo-navbar'></img>
                <div className="navbar">
                    <select>
                        <option value="choice">&#9660;</option>
                        <option value="home">Home</option>
                        <option value="logout">Logout</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Navbar