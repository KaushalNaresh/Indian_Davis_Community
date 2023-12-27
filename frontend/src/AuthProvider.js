import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        ucdavisId: "",
        toDate: null,
        fromDate: null,
        major: "",
        degree: "",
        country: "",
        region: "",
        foodPreference: "",
        smoker: "",
        drinker: "",
        gender: ""
    });
  
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    const setUserDetails = (newDetails) => {
        setUser(newDetails);
      };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUserDetails}}>
        {children}
      </AuthContext.Provider>
    );
  };
  