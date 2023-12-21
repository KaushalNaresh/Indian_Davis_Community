import React, { useContext } from 'react';
import './Header.css'; // Make sure you link the CSS file for styling
import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';



function Header(){

    const navigate = useNavigate(); 

    const handleLogoClick = () => {
        navigate('/');
    };

    const {isLoggedIn, logout} = useContext(AuthContext);

    return(
        <header className="header">
            <div className="header-logo" onClick={() => handleLogoClick()}>ICD</div>
            <div className="header-search">
                <input type="text" placeholder="search" />
            </div>
            <div className="header-actions">
                <Link className="action-button" to="/">Get App</Link>
                {isLoggedIn ?
                <Link className="action-button" to="/" onClick={() => logout()}>Logout</Link>:
                <Link className="action-button" to="/login">Login</Link>
                }
            </div>
        </header>
)};

export default Header;

