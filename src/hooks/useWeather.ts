import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

if (!API_KEY) {
    console.error('API Key is not defined! Please set the REACT_APP_WEATHER_API_KEY environment variable.');
    throw new Error('API Key is not defined!');
}

interface WeatherData {
    city: string;
    country: string;
    date: string;
    icon: string;
    description: string;
    temperature: number;
}

interface UseWeatherReturn {
    weather: WeatherData | null;
    loading: boolean;
    error: boolean;
}

/**
 * Custom hook to fetch weather data from OpenWeatherMap API.
 * 
 * @param {string} city - The city name to fetch weather data for.
 * @returns {UseWeatherReturn} An object containing the weather data, loading state, and error state.
 */
const useWeather = (city: string): UseWeatherReturn => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // Fetch weather data from OpenWeatherMap API
    useEffect(() => {
        if (city) {
            const fetchWeather = async () => {
                setLoading(true);
                setError(false);

                try {
                    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
                    const units = 'metric';
                    const query = `?q=${city}&appid=${API_KEY}&units=${units}`;
                    const url = baseUrl + query;

                    // Fetch weather data using Axios
                    const response = await axios.get(url);

                    const data = response.data;

                    console.log('Weather data retrieved:', data);

                    // Set the weather variable with the fetched data
                    setWeather({
                        city: data.name,
                        country: data.sys.country,
                        date: new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }),
                        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                        description: transformDescription(data.weather[0].description),
                        temperature: Math.round(data.main.temp),
                    });
                } catch (error: any) { // If an error occurs, set the error state and reset the weather state
                    setError(true);
                    setWeather(null);
                } finally {
                    setLoading(false);
                }
            };
            fetchWeather();
        }
    }, [city]);

    return { weather, loading, error };
};

/**
 * Transforms a weather description string by capitalizing the first letter of each word.
 *
 * @param {string} description - The weather description to transform.
 * @returns {string} The transformed description with each word capitalized.
 */
function transformDescription(description: string): string {
    return description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default useWeather;