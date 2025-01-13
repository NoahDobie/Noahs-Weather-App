import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import { getTemperatureColor, fitTextToContainer } from '../utils/utils';
import LoadingSpinner from './LoadingSpinner';

interface WeatherProps {
    weather: {
        city: string;
        country: string;
        date: string;
        icon: string;
        description: string;
        temperature: number;
    };
    loading: boolean;
}

/**
 * Weather component that displays weather information.
 *
 * @param {WeatherProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const Weather: React.FC<WeatherProps> = ({ weather, loading }) => {
    const { removeWeatherFromHistory, theme } = useStore();
    const [fontSize, setFontSize] = useState(24); // Initial font size
    const containerRef = useRef<HTMLDivElement>(null);

    // If no weather data is available, display a message
    if (!weather) {
        return <p className="mt-10 text-center text-gray-500">No weather data available.</p>;
    }

    // Get the temperature color using the utility function
    const temperatureColor = getTemperatureColor(weather.temperature);

    // Handle click event to remove the weather forecast
    const handleClick = () => {
        removeWeatherFromHistory(weather.city);
    };

    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const newFontSize = fitTextToContainer(`${weather.city}, ${weather.country}`, containerWidth, 24, 12);
            setFontSize(newFontSize);
        }
    }, [weather.city, weather.country]);

    return (
        <div
            ref={containerRef}
            className={`p-4 w-full  flex flex-col justify-self-center justify-center items-center text-center cursor-pointer
             ${theme === 'dark' ? 'bg-dark-primary text-white' : 'bg-light-secondary text-light-text'}
            rounded-2xl border-2 border-transparent hover:border-red-500 transform transition-all duration-300 hover:scale-105`}
            onClick={handleClick}
        >
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h3
                        className="tracking-widest font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ fontSize: `${fontSize}px`, maxWidth: '100%', minHeight: 'auto' }}
                    >
                        {weather.city}, {weather.country}
                    </h3>

                    <img
                        src={weather.icon}
                        alt="weather icon" 
                        className="-mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                    />
                    
                    <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-xl">{weather.description}</p>

                    <h2 className="font-semibold text-2xl sm:text-2xl md:text-4xl lg:text-4xl">
                        {weather.temperature}
                        <span
                            className="ml-1 align-top text-md sm:text-lg md:text-xl lg:text-2xl font-bold" 
                            style={{ color: temperatureColor }}
                        >
                            °C
                        </span>
                    </h2>
                </>
            )}
        </div>
    );
};

export default Weather;