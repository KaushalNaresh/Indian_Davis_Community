import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './RoommateFinder.css';
import backgroundImage from './images/RoomatesInfo.jpg';
import axios from 'axios';
import Constants from './StringConstants.json';
import ICONS from './IconConstants';
import StudentsImg1 from './images/student_1.jpg';
import StudentsImg2 from './images/student_2.jpg';
import StudentsImg3 from './images/student_3.jpg';
import StudentsImg4 from './images/student_4.jpg';
import StudentsImg5 from './images/student_5.jpg';
import StudentsImg6 from './images/student_6.jpeg';
import RoommateProfileModal from './components/RoommateProfileModal';
import Header from './Header'

const RoommateFinder = () => {
    const [roommates, setRoommates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoommate, setSelectedRoommate] = useState(null);
    const { isLoggedIn, user } = useContext(AuthContext);
    const BASE_URL = Constants.base_url;
    const profilePics = [StudentsImg4, StudentsImg2, StudentsImg1, StudentsImg3, StudentsImg5, StudentsImg6];

    useEffect(() => {
        const fetchRoommates = async () => {
            try {
                const response = await fetch(`${BASE_URL}/user/top6`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                const data = await response.json();
                console.log('Response data:', data); // For debugging

                if (data.success) {
                    setRoommates(data.data);
                } else {
                    setError('Failed to fetch roommates');
                }
            } catch (err) {
                setError(err.message || 'Error fetching roommates');
                console.error('Error fetching roommates:', err);
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchRoommates();
        }
    }, [isLoggedIn, BASE_URL]);

    const handleConnect = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const handleViewProfile = (roommate) => {
        console.log('Selected roommate data:', roommate);
        setSelectedRoommate(roommate);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRoommate(null);
    };

    if (!isLoggedIn) {
        return (
            <div className="roommate-finder-container">
                <div className="roommate-finder-overlay"></div>
                <div className="roommate-finder-content">
                    <h1>Find Your Perfect Roommate</h1>
                    <p>Please log in to view and connect with potential roommates.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="roommate-finder-container">
                <div className="roommate-finder-overlay"></div>
                <div className="roommate-finder-content">
                    <h1>Find Your Perfect Roommate</h1>
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
        <Header />
        <div className="roommate-finder-container">
            <div className="roommate-finder-overlay"></div>
            <div className="roommate-finder-content">
                <h1>Find Your Perfect Roommate</h1>
                <p>Connect with UC Davis students who match your lifestyle and preferences.</p>
                
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : roommates.length === 0 ? (
                    <div className="no-roommates">
                        <p>No roommates found at the moment. Check back later!</p>
                    </div>
                ) : (
                    <div className="roommate-grid">
                        {roommates.map((roommate, index) => (
                            <div key={roommate._id} className="roommate-card">
                                <div className="roommate-image">
                                    <img 
                                        src={profilePics[index % profilePics.length]} 
                                        alt={`${roommate.firstName} ${roommate.lastName}`} 
                                    />
                                </div>
                                <div className="roommate-info">
                                    <h2>{roommate.firstName} {roommate.lastName}</h2>
                                    <div className="match-score">
                                        <span className="score-label">Match Score:</span>
                                        <span className="score-value">{Math.round(roommate.matchScore)}%</span>
                                    </div>
                                    <div className="roommate-details">
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
                                            <span className="value location-text">
                                                {roommate.country && roommate.state 
                                                    ? `${roommate.country}, ${roommate.state}`
                                                    : "Not specified"}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="preferences">
                                        <div className="preference-icons">
                                            {roommate.smoker && (
                                                <div className="preference-item" title={`Smoking: ${roommate.smoker === "1" ? "Smoker" : "Non-smoker"}`}>
                                                    {React.createElement(ICONS.getSmokingIcon(roommate.smoker), { className: "preference-icon" })}
                                                </div>
                                            )}
                                            {roommate.food && (
                                                <div className="preference-item" title={`Food: ${roommate.food === "1" ? "Non-vegetarian" : "Vegetarian"}`}>
                                                    {React.createElement(ICONS.getFoodIcon(roommate.food), { className: "preference-icon" })}
                                                </div>
                                            )}
                                            {roommate.drinker && (
                                                <div className="preference-item" title={`Drinking: ${roommate.drinker === "1" ? "Drinker" : "Non-drinker"}`}>
                                                    {React.createElement(ICONS.getDrinkingIcon(roommate.drinker), { className: "preference-icon" })}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="card-actions">
                                        <button 
                                            className="view-profile-button"
                                            onClick={() => handleViewProfile(roommate)}
                                        >
                                            View Profile
                                        </button>
                                        <button 
                                            className="connect-button"
                                            onClick={() => handleConnect(roommate.email)}
                                        >
                                            <ICONS.FaEnvelope className="icon" /> Connect
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <RoommateProfileModal
                    show={showModal}
                    onHide={handleCloseModal}
                    roommate={selectedRoommate}
                    profilePics={profilePics}
                    roommates={roommates}
                    onConnect={handleConnect}
                />
            </div>
        </div>
        </>
    );
};

export default RoommateFinder;