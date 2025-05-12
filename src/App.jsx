import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/Search.jsx';
import Weather from './components/Weather.jsx';
import Loader from './components/Loader.jsx';
import useSearchHistory from './hooks/useSearchHistory';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { history, addToHistory } = useSearchHistory();

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) throw new Error('API key not configured');
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(currentUrl),
        axios.get(forecastUrl),
      ]);
      setWeatherData(currentResponse.data);
      setForecastData(forecastResponse.data.list.filter((_, i) => i % 8 === 0).slice(0, 5));
      addToHistory(city);
    } catch (err) {
      setError(err.response?.status === 404 ? 'City not found' : err.message || 'An error occurred');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // Get data from your own location
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            const [currentResponse, forecastResponse] = await Promise.all([
              axios.get(url),
              axios.get(forecastUrl),
            ]);
            setWeatherData(currentResponse.data);
            setForecastData(forecastResponse.data.list.filter((_, i) => i % 8 === 0).slice(0, 5));
            addToHistory(currentResponse.data.name);
          } catch (err) {
            setError('Failed to fetch weather for your location');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Geolocation permission denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
    }
  };

  // Gives the background image according to the weather condition. Default image is used if no weather data is available.
  const getBackgroundImage = () => {
    if (!weatherData) return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
    const condition = weatherData.weather[0].main.toLowerCase();
    switch (condition) {
      case 'clear':
        return 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
      case 'clouds':
        return 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
      case 'rain':
        return 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
      case 'snow':
        return 'https://images.unsplash.com/photo-1483921020237-4070be7d8b60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
      default:
        return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
    }
  };

  // Toggles dark mode and dispatches a custom event to notify other components that dark mode has changed
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      window.dispatchEvent(new CustomEvent('darkModeToggle', { detail: { isDarkMode: newMode } }));
      return newMode;
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${getBackgroundImage()})`,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-4 sm:mb-6 -mt-16 sm:-mt-20">
          <h1 className="flex-1 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-gray-200 drop-shadow-lg mb-4 sm:mb-0">
            Weather Dashboard
          </h1>
          <button
            onClick={toggleDarkMode}
            className="w-auto sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 dark:bg-gray-300 dark:text-gray-800 dark:hover:bg-gray-400 transition-all duration-300 text-sm sm:text-base"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <button
          onClick={handleGeolocation}
          className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 mb-4 transition-all duration-300 text-sm sm:text-base"
        >
          Use My Location
        </button>
        <Search onSearch={handleSearch} />
        <Weather weatherData={weatherData} forecastData={forecastData} loading={loading} error={error} onRefresh={handleSearch} />
        {history.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-lg w-full max-w-md transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-white dark:text-gray-200 mb-2 drop-shadow-md">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {history.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(city)}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-white bg-opacity-30 dark:bg-gray-700 dark:text-gray-200 text-white rounded-full hover:bg-opacity-50 dark:hover:bg-gray-600 transition-all duration-300 text-sm sm:text-base"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;