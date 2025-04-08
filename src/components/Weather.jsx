import React from 'react';
import Loader from './Loader.jsx';

const Weather = ({ weatherData, forecastData, loading, error, onRefresh }) => {
  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-300 text-sm sm:text-lg bg-red-500 bg-opacity-20 dark:bg-red-900 p-4 rounded-lg opacity-0 animate-fade-in">
        {error}
      </div>
    );
  if (!weatherData)
    return (
      <div className="text-center text-white text-sm sm:text-lg bg-gray-500 bg-opacity-20 dark:bg-gray-700 p-4 rounded-lg opacity-0 animate-fade-in">
        Search for a city to see the weather.
      </div>
    );

  const { name, main, weather, wind } = weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="w-full max-w-xs sm:max-w-md mx-auto bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-lg shadow-xl rounded-xl p-4 sm:p-6 text-white opacity-0 animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 drop-shadow-md">{name}</h2>
      <div className="flex items-center justify-center mb-4">
        <img src={iconUrl} alt={weather[0].description} className="w-16 sm:w-20 h-16 sm:h-20" />
        <p className="text-4xl sm:text-5xl ml-4 font-semibold">{main.temp}°C</p>
      </div>
      <p className="text-lg sm:text-2xl mb-2 capitalize">{weather[0].description}</p>
      <p className="mb-2 text-sm sm:text-lg">Humidity: {main.humidity}%</p>
      <p className="mb-4 text-sm sm:text-lg">Wind Speed: {wind.speed} km/h</p>
      <button
        onClick={() => onRefresh(name)}
        className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md text-sm sm:text-base"
      >
        Refresh
      </button>
      {forecastData && (
        <div className="mt-4 sm:mt-6 opacity-0 animate-fade-in animation-delay-200">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">5-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
            {forecastData.map((day, index) => (
              <div key={index} className="text-center opacity-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <p className="text-xs sm:text-sm">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="forecast" className="w-8 sm:w-10 mx-auto" />
                <p className="text-sm sm:text-lg">{Math.round(day.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;