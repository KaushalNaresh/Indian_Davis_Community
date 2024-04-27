import React, { useContext, useEffect, useRef } from 'react';
import './Header.css';
import Typed from 'typed.js';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import logo from './images/Logo.png';

function Header({ setShowLogIn, setShowSignUp }) {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(AuthContext);
    const typedTextRef = useRef(null);

    useEffect(() => {
        if (typedTextRef.current) {
            const typed = new Typed(typedTextRef.current, {
                strings: ["ICD", "Indian Community @ Davis"],
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 1500,
                startDelay: 500,
                showCursor: false,
                loop: false
            });

            return () => {
                typed.destroy();
            };
        }
    }, []);

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-logo" onClick={handleLogoClick}>
                <img src={logo} alt="Logo" />
                <span ref={typedTextRef} className="header-typed-text"></span>
            </div>
            <div className="header-actions">
                {isLoggedIn ? (
                    <>
                        <Link className="action-button" to="/profile">Profile</Link>
                        <button className="action-button" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <button className="action-button" onClick={() => setShowLogIn(true)}>Login</button>
                )}
            </div>
        </header>
    );
}

export default Header;
