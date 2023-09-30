import React from 'react'
import "./Navbar.css";
import logo from './steth.png'

const Navbar = () => {
    return (
        <div>
            {/* Code here */}
            <div class="header">
                <img src={logo}></img>
                <div class="lorem" >
                    Lorem impsum
                </div>
            </div>
        </div>
    )
}

export default Navbar