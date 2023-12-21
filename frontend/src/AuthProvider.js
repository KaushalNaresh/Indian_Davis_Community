import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        ucdavisId: ""
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
  