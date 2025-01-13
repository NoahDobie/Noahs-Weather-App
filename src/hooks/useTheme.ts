import { useEffect } from 'react';
import { detectSystemTheme } from '../utils/utils';
import useStore from '../store/store';

/**
 * Custom hook to manage and toggle the theme based on the system's theme preference.
 *
 * This hook uses the `useStore` hook to access the `toggleTheme` function and sets the initial theme
 * based on the system's theme preference using the `detectSystemTheme` function.
 *
 * @returns {void}
 */
const useTheme = (): void => {
    const { toggleTheme } = useStore();

    useEffect(() => {
        const systemTheme = detectSystemTheme();
        toggleTheme(systemTheme); // Set the initial theme based on system preference
    }, [toggleTheme]);
};

export default useTheme;