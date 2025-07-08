import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useTheme } from '../../Context/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? (
        <BsSun className="w-6 h-6 text-yellow-500 transition-transform duration-300 hover:scale-110" />
      ) : (
        <BsMoon className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform duration-300 hover:scale-110" />
      )}
    </button>
  );
};

export default ThemeToggle;
