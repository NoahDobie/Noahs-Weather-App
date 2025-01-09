import React from 'react';
import PropTypes from 'prop-types';
import useStore from './store';

/**
 * Weather component that displays weather information.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.weather - The weather data to display.
 * @returns {JSX.Element} The rendered component.
 */
function Weather({ weather }) {
    const removeWeatherFromHistory = useStore((state) => state.removeWeatherFromHistory);

    // If no weather data is available, display a message
    if (!weather) {
        return <p className="mt-10 text-center text-gray-500">No weather data available.</p>;
    }

    // Set the temperature color based on the temperature value
    const temperatureColor = weather.temperature > 30 ? 'red' 
        : weather.temperature > 25 ? 'orange' 
        : weather.temperature > 20 ? 'yellow' 
        : weather.temperature > 15 ? 'limegreen' 
        : weather.temperature > 10 ? 'blue'
        : weather.temperature > 5 ? 'teal' 
        : weather.temperature > 0 ? 'sky'
        : 'white';

    // Handle click event to remove the weather forecast
    const handleClick = () => {
        removeWeatherFromHistory(weather.city);
    };

    return (
        <div
            className="m-4 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center items-center text-center cursor-pointer
             bg-gray-800 rounded-2xl w-full h-full border-2 border-transparent hover:border-red-500"
            onClick={handleClick}
        >
            <h3 className="mb-4 text-lg tracking-widest font-semibold sm:text-xl md:text-2xl lg:text-2xl">
                {weather.city}, {weather.country}
            </h3>
            <img src={weather.icon} alt="weather icon" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"/>
            <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-xl">{weather.description}</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {weather.temperature}
                <span 
                    className="ml-1 align-top text-sm sm:text-sm md:text-md lg:text-2xl font-bold" 
                    style={{ color: temperatureColor }}
                >
                    °C
                </span>
            </h2>
        </div>
    );
}

// Define the prop types for the component
Weather.propTypes = {
    weather: PropTypes.shape({
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        temperature: PropTypes.number.isRequired,
    }).isRequired,
};

export default Weather;