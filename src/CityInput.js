import React from 'react';

/**
 * CityInput is a functional component that renders an input field for entering a city name.
 * 
 * @param {Object} props - The props object.
 * @param {string} props.city - The current city name.
 * @param {function} props.setCity - Function to update the city name.
 * @param {function} props.handleKeyPress - Function to handle key press events.
 */
function CityInput({ city, setCity, handleKeyPress }) {

    // Handler for the input change event - updates the city name when the input changes
    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const placeholder = "Enter city..."; // Placeholder text for the input field

    // Render the component
    return (
        <input
            className={`m-4 mb-10 p-3 text-base sm:text-lg md:text-xl lg:text-2xl text-white rounded-xl text-center bg-gray-800
                transition-all duration-500 placeholder-gray-500`}
            type="text"
            placeholder={placeholder}
            value={city}
            onChange={handleChange} // Handle input change events
            onKeyDown={handleKeyPress} // Handle key press events
        />
    );
}

export default CityInput;