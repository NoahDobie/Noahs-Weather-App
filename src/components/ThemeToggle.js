import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

/**
 * 
 * Using @anatoliygatt/dark-mode-toggle package to create a toggle switch for changing the theme.
 * found on github here: https://github.com/anatoliygatt/dark-mode-toggle
 * 
 * ALL CREDIT GOES TO THE AUTHOR OF THE PACKAGE FOR THIS TOGGLE SWITCH!!
 * 
 */


/**
 * ThemeToggle component that provides a toggle switch for changing the theme.
 * It uses the `useStore` hook to get the current theme and the function to toggle the theme.
 *
 * @component
 * @example
 * return (
 *   <ThemeToggle />
 * )
 */
const ThemeToggle = () => {
    const { theme, toggleTheme } = useStore(); // Get the theme and toggleTheme function from the store

    const handleModeChange = () => {
        toggleTheme();
    };

    return (
        <div className="absolute top-4 right-4">
            <DarkModeToggle
                mode={theme}
                ariaLabel="Toggle color scheme"
                size="sm"
                inactiveTrackColor="#F7F8F9"
                inactiveTrackColorOnHover="#EBEBEB"
                inactiveTrackColorOnActive="#374151"
                activeTrackColor="#1f2937"
                activeTrackColorOnHover="#0e131a"
                activeTrackColorOnActive="#2C3E5D"
                inactiveThumbColor="#4b5563"
                activeThumbColor="#f9fafb"
                onChange={handleModeChange}
            />
        </div>
    );
};

export default ThemeToggle;