import React, { useState, useEffect } from "react";
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
        await checkAuthStatus(); 
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
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/check-auth`, 
                                            { 
                                                method: 'GET',
                                                credentials: 'include',
                                                headers: { 'Content-Type': 'application/json' }
                                            }
                                        );

            if (response.ok) {
                setIsLoggedIn(true);

                // Fetch user details now
                const authUser = await response.json();
                const email = authUser.email;
                const userDetailsResponse = await fetch(`${BASE_URL}/user/details?email=${email}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                });

                const userDetails = await userDetailsResponse.json();
                
                if (!userDetailsResponse.ok) 
                    throw new Error(userDetails.message);

                setUserDetails(userDetails.users[0]);

            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking authentication status', error);
        }
    };

    const setUserDetails = (newDetails) => {
        setUser(newDetails);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUserDetails}}>
        {children}
      </AuthContext.Provider>
    );
  };
  