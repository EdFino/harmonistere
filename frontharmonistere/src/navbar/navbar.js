import React from 'react';
import logo from '../images/logo.jpg';
import './navbar.css';
import { Link, Outlet } from 'react-router-dom';

    function Navbar(props) {
        return (
            <div id="navbar" style={{width: props.width}}>
                <Link to={'/'}><img id="logo" src={logo} alt="Logo de l'application" />
                <span id="returnHome">Home</span></Link>
            </div>

    );
    }

export default Navbar;