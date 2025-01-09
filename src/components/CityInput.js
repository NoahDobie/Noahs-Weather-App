import React from 'react';
import useStore from '../store/store';

/**
 * CityInput component that allows the user to input a city name.
 *
 * @param {Object} props - The component props.
 * @param {function} props.handleKeyPress - Function to handle key press events.
 */
function CityInput({ handleKeyPress }) {
    const { city, setCity, theme } = useStore();

    // Handler for the input change event - updates the city name when the input changes
    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const placeholder = "Enter city..."; // Placeholder text for the input field

    // Render the component
    return (
        <input
            className={`m-4 mb-10 p-3 text-base sm:text-lg md:text-xl lg:text-2xl rounded-xl text-center transition-all duration-500 
                ${ theme === 'dark' ? 'bg-dark-primary text-dark-text placeholder-dark-secondary' : 'bg-light-secondary text-light-text placeholder-light-text' }`
            }
            type="text"
            placeholder={placeholder}
            value={city}
            onChange={handleChange} // Handle input change events
            onKeyDown={handleKeyPress} // Handle key press events
        />
    );
}

export default CityInput;