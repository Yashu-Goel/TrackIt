import React from 'react'
import "./Navbar2.css";
import logo from './logo_name_white.png'

const Navbar2 = () => {
    return (
        <div>
            {/* Code here */}
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

export default Navbar2