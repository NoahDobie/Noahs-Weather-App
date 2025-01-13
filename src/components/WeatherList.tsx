import React, { useEffect, useState } from 'react';
import Weather from './Weather';

interface WeatherListProps {
    weatherHistory: Array<{
        city: string;
        country: string;
        date: string;
        icon: string;
        description: string;
        temperature: number;
    }>;
    loading: boolean;
}

const WeatherList: React.FC<WeatherListProps> = ({ weatherHistory, loading }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const gridClasses = () => {
        switch (weatherHistory.length) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-1 sm:grid-cols-2";
            case 3:
                return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
            default:
                return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
        }
    };

    const displayedWeatherHistory = windowWidth < 640 ? weatherHistory.slice(0, 2) : weatherHistory.slice(0, 4);

    return (
        <div className="mx-4 mb-10 flex justify-center">
            <div className={`grid gap-4 ${gridClasses()} items-center`}>
                {displayedWeatherHistory.map((weather, index) => (
                    <div key={index}>
                        <Weather weather={weather} loading={loading && weather.city === weatherHistory[0].city} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherList;