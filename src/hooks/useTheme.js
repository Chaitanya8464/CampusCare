import { useState, useEffect } from 'react';

/**
 * Custom hook for managing theme (dark/light mode)
 * Persists theme preference in localStorage
 * @returns {Object} Theme state and toggle function
 * @returns {boolean} isDarkMode - Current theme state
 * @returns {Function} toggleTheme - Function to toggle theme
 */
export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return { isDarkMode, toggleTheme };
};

export default useTheme;
