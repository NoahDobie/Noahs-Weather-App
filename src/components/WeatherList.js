import React from 'react';
import PropTypes from 'prop-types';
import Weather from './Weather';
import useStore from '../store/store';

/**
 * WeatherList component that displays a list of weather forecasts.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.weatherHistory - The list of weather forecasts to display.
 * @returns {JSX.Element} The rendered component.
 */
function WeatherList({ weatherHistory }) {
    return (
        <div className="flex justify-center w-full">
            <div className="weather-list">
                {weatherHistory.map((weather, index) => (
                    <Weather key={index} weather={weather} />
                ))}
            </div>
        </div>
    );
}

// Define the prop types for the component
WeatherList.propTypes = {
    weatherHistory: PropTypes.arrayOf(
        PropTypes.shape({
            city: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            temperature: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default WeatherList;