import React from 'react';
import './Footer.css'; // Make sure to link the CSS file for styling

const Footer = () => (
    <footer className="footer">
        
        <div className="footer-links">
            <div className="footer-section">
                <h3>Your Account</h3>
                <ul>
                    <li>Sign up</li>
                    <li>Log in</li>
                    <li>Help</li>
                    <li>Become an Affiliate</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Discover</h3>
                <ul>
                    <li>Groups</li>
                    <li>Calendar</li>
                    <li>Topics</li>
                    <li>Online Events</li>
                    <li>Local Guides</li>
                    <li>Make Friends</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>ICD</h3>
                <ul>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Apps</li>
                    <li>Podcast</li>
                </ul>
            </div>
        </div>
        <div className="footer-social">
            {/* Icons would go here */}
        </div>
        <div className="footer-bottom">
            <p>© 2023 ICD</p>
            <ul>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Help</li>
            </ul>
        </div>
    </footer>
);

export default Footer;
