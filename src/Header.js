import React from 'react';
import './Header.css'; // Make sure you link the CSS file for styling

const Header = () => (
    <header className="header">
        <div className="header__logo">ICD</div>
        <div className="header__search">
            <input type="text" placeholder="search" />
        </div>
        <div className="header__actions">
            <button className="action__button">get app</button>
            <button className="action__button">Login</button>
        </div>
    </header>
);

export default Header;
