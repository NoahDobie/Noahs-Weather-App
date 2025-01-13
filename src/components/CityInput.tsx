import React, { ChangeEvent, KeyboardEvent } from 'react';
import useStore from '../store/store';

interface CityInputProps {
    handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
    error: boolean;
}

/**
 * CityInput component that allows the user to input a city name.
 *
 * @param {CityInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const CityInput: React.FC<CityInputProps> = ({ handleKeyPress, error }) => {
    const { city, setCity, theme } = useStore();

    // Handler for the input change event - updates the city name when the input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const placeholder = "Enter city...";

    // Render the component
    return (
        <input
            className={`m-4 mb-10 p-3 text-base sm:text-lg md:text-xl lg:text-2xl rounded-xl text-center transition-all duration-500 outline-none
                ${theme === 'dark' ? 'bg-dark-primary text-dark-text placeholder-dark-secondary outline-1 hover:outline-dark-secondary focus:outline-dark-text' : 'bg-light-secondary text-light-text placeholder-light-text outline-1 hover:outline-light-secondary focus:outline-light-text'}
                ${error ? 'animate-shake' : 'border-transparent '}`}
            type="text"
            placeholder={placeholder}
            value={city}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
        />
    );
}

export default CityInput;