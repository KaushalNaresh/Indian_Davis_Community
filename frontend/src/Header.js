import React, { useContext } from 'react';
import './Header.css'; // Make sure you link the CSS file for styling
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';



function Header({setShowLogIn, setShowSignUp}){

    const navigate = useNavigate();
    const {isLoggedIn, logout} = useContext(AuthContext);

    const handleLogoClick = () => {
        if(!isLoggedIn){
            setShowSignUp(false);
            setShowLogIn(false);
        }
        navigate('/');
    };

    const handleLoginClick = () => {
        setShowSignUp(false);
        setShowLogIn(true);
    };

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
                {isLoggedIn ?
                    <>
                        <Link className="action-button" to="/profile">Profile</Link>
                        <Link className="action-button" to="/" onClick={() => logout()}>Logout</Link>
                    </>
                    :
                    <a className="action-button" onClick={() => handleLoginClick()}>Login</a>
                }
            </div>
        </header>
)};

export default Header;

