import React from 'react';
import logo from '../images/logo.jpg';
import './navbar.css';
import { Link, Outlet } from 'react-router-dom';

    function Navbar() {
        return (
    <div id="navbar">
        <img id="logo" src={logo} alt="Logo de l'application" />
        <Link to={'/'}><span id="returnHome">Home</span></Link>
        <Outlet/>
    </div>

    );
    }

export default Navbar;