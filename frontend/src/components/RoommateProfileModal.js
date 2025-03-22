import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ICONS from '../IconConstants';
import Constants from '../StringConstants.json';
import './RoommateProfileModal.css';

const RoommateProfileModal = ({ show, onHide, roommate, profilePics, roommates, onConnect }) => {
    const [showFullBio, setShowFullBio] = useState(false);

    if (!roommate) return null;

    const getProfilePic = (roommateId) => {
        const index = roommates.findIndex(r => r._id === roommateId);
        return profilePics[index % profilePics.length];
    };

    const getSocialIcon = (platform) => {
        switch (platform?.toLowerCase()) {
            case 'facebook': return <ICONS.FaFacebook />;
            case 'instagram': return <ICONS.FaInstagram />;
            case 'linkedin': return <ICONS.FaLinkedin />;
            default: return null;
        }
    };

    const getSocialUrl = (platform, username) => {
        switch (platform?.toLowerCase()) {
            case 'facebook': return `https://facebook.com/${username}`;
            case 'instagram': return `https://instagram.com/${username}`;
            case 'linkedin': return `https://linkedin.com/in/${username}`;
            default: return '#';
        }
    };

    const bio = roommate.aboutYou || "No description available.";
    const displayBio = showFullBio ? bio : bio.length > 100 ? bio.substring(0, 100) + '...' : bio;

    return (
        <Modal show={show} onHide={onHide} centered size="lg" className="roommate-profile-modal">
            <Modal.Header closeButton>
                <Modal.Title>{roommate.firstName} {roommate.lastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="profile-modal-content">
                    <div className="profile-header">
                        <img 
                            src={getProfilePic(roommate._id)} 
                            alt={roommate.firstName} 
                            className="modal-profile-image"
                        />
                        <div className="match-score">
                            <span className="score-label">Match Score:</span>
                            <span className="score-value">{Math.round(roommate.matchScore)}%</span>
                        </div>
                    </div>
                    
                    <div className="profile-details">
                        <div className="detail-section">
                            <h3>Basic Information</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="label">Major:</span>
                                    <span className="value">{Constants.majorMapping[roommate.major?.toUpperCase()] || "Not specified"}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Degree:</span>
                                    <span className="value">{Constants.degreeMapping[roommate.degree?.toUpperCase()] || "Not specified"}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Location:</span>
                                    <span className="value">
                                        {roommate.country && roommate.state 
                                            ? `${roommate.country}, ${roommate.state}`
                                            : roommate.country 
                                                ? roommate.country 
                                                : "Not specified"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="about-me-section">
                            <h3>About Me</h3>
                            <div className="bio-content">
                                <p>{displayBio}</p>
                                {bio.length > 100 && (
                                    <button 
                                        className="show-more-button"
                                        onClick={() => setShowFullBio(!showFullBio)}
                                    >
                                        {showFullBio ? "Show Less" : "Show More"}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="detail-section">
                            <h3>Preferences</h3>
                            <div className="preferences-grid">
                                <div className="preference-item">
                                    <span className="preference-icon">
                                        {React.createElement(ICONS.getSmokingIcon(roommate.smoker), { className: "preference-icon" })}
                                    </span>
                                    <span className="preference-label">
                                        {roommate.smoker === "1" ? "Smoker" : "Non-smoker"}
                                    </span>
                                </div>
                                <div className="preference-item">
                                    <span className="preference-icon">
                                        {React.createElement(ICONS.getFoodIcon(roommate.food), { className: "preference-icon" })}
                                    </span>
                                    <span className="preference-label">
                                        {roommate.food === "1" ? "Non-vegetarian" : "Vegetarian"}
                                    </span>
                                </div>
                                <div className="preference-item">
                                    <span className="preference-icon">
                                        {React.createElement(ICONS.getDrinkingIcon(roommate.drinker), { className: "preference-icon" })}
                                    </span>
                                    <span className="preference-label">
                                        {roommate.drinker === "1" ? "Drinker" : "Non-drinker"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="detail-section">
                            <h3>Social Media</h3>
                            <div className="social-links">
                                {roommate.socialMediaAccounts && roommate.socialMediaAccounts.length > 0 ? (
                                    roommate.socialMediaAccounts.map((account, index) => (
                                        <a
                                            key={index}
                                            href={getSocialUrl(account.platform, account.username)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                        >
                                            {getSocialIcon(account.platform)}
                                        </a>
                                    ))
                                ) : (
                                    <p>No social media accounts added.</p>
                                )}
                            </div>
                        </div>

                        <button 
                            className="modal-connect"
                            onClick={() => onConnect(roommate.email)}
                        >
                            <ICONS.FaEnvelope className="icon" /> Connect via Email
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default RoommateProfileModal; 