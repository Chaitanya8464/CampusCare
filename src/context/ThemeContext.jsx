import React, { createContext, useContext, useMemo } from 'react';
import useThemeHook from '../hooks/useTheme';

const ThemeContext = createContext(null);

/**
 * Custom hook to access theme context
 * @returns {Object} Theme context value
 * @throws {Error} If used outside ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Theme Provider Component
 * Manages dark/light mode theme state and provides context to children
 */
export const ThemeProvider = ({ children }) => {
  const themeValue = useThemeHook();

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isDarkMode: themeValue.isDarkMode,
      toggleTheme: themeValue.toggleTheme
    }),
    [themeValue.isDarkMode, themeValue.toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
