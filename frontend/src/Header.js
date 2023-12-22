import React, { useContext } from 'react';
import './Header.css'; // Make sure you link the CSS file for styling
import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';



function Header({setShowLogIn, setShowSignUp}){

    const navigate = useNavigate(); 

    const handleLogoClick = () => {
        setShowSignUp(false);
        setShowLogIn(false);
        navigate('/');
    };

    const {isLoggedIn, logout} = useContext(AuthContext);

    return(
        <header className="header">
            <div className="header-logo" onClick={() => handleLogoClick()}>ICD</div>
            <div className="header-search">
            {
                isLoggedIn ? 
                <input type="text" placeholder="search" /> : 
                <></>
            }
            </div>
            <div className="header-actions">
                <Link className="action-button" to="/">Get App</Link>
                {isLoggedIn ?
                    <Link className="action-button" to="/" onClick={() => logout()}>Logout</Link>:
                    <a className="action-button" onClick={() => setShowLogIn(true)}>Login</a>
                }
            </div>
        </header>
)};

export default Header;

