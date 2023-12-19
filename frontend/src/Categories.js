import React from 'react';
import './Categories.css'; // Make sure you link the CSS file for styling

const Categories = () => (
    <div className="categories">
        <div className="category" id="events">Events</div>
        <div className="category" id="housing">Housing</div>
        <div className="category" id="roommate-finder">Roommate Finder</div>
        <div className="category" id="popular-places">Popular Places</div>
        <div className="category" id="for-you">For You</div>
    </div>
);

export default Categories;
