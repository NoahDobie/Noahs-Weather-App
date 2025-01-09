import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Weather from './Weather';
import { getGridConfig } from './utils';
import useStore from './store';

/**
 * WeatherList component that displays a list of weather forecasts.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.weatherHistory - The list of weather forecasts to display.
 * @returns {JSX.Element} The rendered component.
 */
function WeatherList({ weatherHistory }) {
    const componentWidth = 320; // Width of each weather component in pixels
    const [gridConfig, setGridConfig] = useState(getGridConfig(componentWidth));
    const setMaxHistory = useStore((state) => state.setMaxHistory);

    useEffect(() => {
        const handleResize = () => {
            const config = getGridConfig(componentWidth);
            setGridConfig(config);
            setMaxHistory(config.maxHistory);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [componentWidth, setMaxHistory]);

    const getGridClass = () => {
        switch (gridConfig.columns) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-2';
            case 3:
                return 'grid-cols-3';
            case 4:
                return 'grid-cols-4';
            case 5:
                return 'grid-cols-5';
            default:
                return 'grid-cols-1';
        }
    };

    return (
        <div className="mb-10 flex justify-center items-center w-full">
            <div className={`grid gap-4 ${getGridClass()} justify-items-center`}>
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