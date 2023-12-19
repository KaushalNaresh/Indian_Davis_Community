import React from 'react';
import './Header.css'; // Make sure you link the CSS file for styling

const Header = () => (
    <header className="header">
        <div className="header-logo">ICD</div>
        <div className="header-search">
            <input type="text" placeholder="search" />
        </div>
        <div className="header-actions">
            <button className="action-button">get app</button>
            <button className="action-button">Login</button>
        </div>
    </header>
);

export default Header;
