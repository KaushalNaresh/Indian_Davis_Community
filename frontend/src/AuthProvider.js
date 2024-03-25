import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import Constants from "./StringConstants.json";

export const AuthProvider = ({ children }) => {
    const BASE_URL = Constants.base_url;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        ucDavisId: "",
        toDate: null,
        fromDate: null,
        major: "",
        degree: "",
        country: "",
        region: "",
        foodPreference: "",
        smoker: "",
        drinker: "",
        gender: "",
        lookingForRoommate: "",
        aboutYou: "",
        socialMediaAccounts: [{ platform: '', username: '' }]
    });
  
    const login = async () => {
        await fetchAuthUser(); 
    };

    const logout = async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/logout`, {
                method: 'POST', // or GET, depending on your server setup
                credentials: 'include', // Important to include credentials
            });
    
            if (response.ok) {
                setIsLoggedIn(false); // Update state after successful logout
                setUser({});
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } 
    }

    useEffect(() => {
        fetchAuthUser();
    }, []);

    const fetchAuthUser = async () => {
        
        try{
            const response = await fetch(`${BASE_URL}/auth/auth-user`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            const userDetails = await response.json();
            
            if (userDetails.message != 'OK' || !response.ok){
                setIsLoggedIn(false);
                throw new Error(userDetails.message);
            }

            setIsLoggedIn(true);
            setUserDetails(userDetails.user[0]);

            const decodedToken = jwtDecode(userDetails.token);
            const currentTime = Date.now() / 1000; // Current time in seconds

            if (decodedToken.exp < currentTime) {
                logout(); 
            } else {
                // Set a timeout to automatically logout when the token expires
                setTimeout(() => {
                    logout();
                }, (decodedToken.exp - currentTime) * 1000); // Convert to milliseconds
            }
        }
        catch(error){
            console.error('Error checking authentication status', error);
        }
    }

    const setUserDetails = (newDetails) => {
        setUser(newDetails);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUserDetails}}>
        {children}
      </AuthContext.Provider>
    );
  };
  