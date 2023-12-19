// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  // Icons for the theme switcher
  const themeIcon = theme === 'light' ? '🌙' : '☀️';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeIcon }}>
      {children}
    </ThemeContext.Provider>
  );
};
