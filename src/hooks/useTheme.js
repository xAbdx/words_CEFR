import { useEffect, useState } from 'react';

function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.localStorage.getItem('word-cards-theme') === 'dark',
  );

  useEffect(() => {
    window.localStorage.setItem('word-cards-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((darkMode) => !darkMode);
  }

  return { isDarkMode, toggleDarkMode };
}

export default useTheme;
