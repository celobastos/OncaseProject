import React from 'react';
import './NavBar.css';
import logo from '../../assets/logoOncase.png';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;