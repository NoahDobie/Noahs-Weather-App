import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/**
 * Custom hook to fetch weather data from OpenWeatherMap API.
 * 
 * @param {string} city - The city name to fetch weather data for.
 * @returns {Object} An object containing the weather data, loading state, and error message.
 * @returns {Object|null} return.weather - The weather data, or null if not available.
 * @returns {boolean} return.loading - The loading state of the weather data.
 * @returns {string|null} return.error - The error message if the API request fails, or null if no error.
 */
const useWeather = (city) => {
    const [weather, setWeather] = useState(null); // Entire weather data variable
    const [loading, setLoading] = useState(false); // For loading state of the weather data
    const [error, setError] = useState(null); // For error state of the weather data (i.e. if the API request fails)

    // Fetch weather data from OpenWeatherMap API
    useEffect(() => {
        if (city) {
            const fetchWeather = async () => {
                setLoading(true); // Set loading state to true
                setError(null); // Reset error state

                try {
                    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
                    const query = `?q=${city}&appid=${API_KEY}&units=metric`;
                    const url = baseUrl + query;

                    // Fetch weather data and check if the response is successful
                    const response = await fetch(url);

                    if (!response.ok) {
                        const errorData = await response.json();
                        const errorMessage = `${errorData.message.charAt(0).toUpperCase() + errorData.message.slice(1)}.`;
                        throw new Error(errorMessage);
                    }

                    const data = await response.json();

                    // Set the weather variable with the fetched data
                    setWeather({
                        city: data.name,
                        country: data.sys.country,
                        date: new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }),
                        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                        description: data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                        temperature: Math.round(data.main.temp),
                    });
                } catch (error) { // If an error occurs, set the error state and reset the weather state
                    setError(error.message);
                    setWeather(null);
                } finally {
                    setLoading(false); // Set loading state to false as the request is complete
                }
            };
            fetchWeather(); // Call the fetchWeather function
        }
    }, [city]);

    return { weather, loading, error };
};

export default useWeather;