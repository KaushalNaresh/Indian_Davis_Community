import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  user:{
    name: "",
    email: "",
    ucdavisId: ""
  },
  login: () => {},
  logout: () => {},
  setUserDetails: () => {}  
});
