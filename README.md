# Weather Dashboard

A React-based weather application built with Vite and styled using Tailwind CSS CDN, deployed on Vercel.
A modern, responsive React-based weather application that allows users to search for real-time weather information for any city using the OpenWeatherMap API. The app supports geolocation, recent search history, and displays both current weather and a 5-day forecast.

## Tech Stack
- **Frontend**: React 19.0.0
- **Build Tool**: Vite 6.2.0
- **HTTP Client**: Axios 1.8.4
- **Styling**: Tailwind CSS (via CDN)
- **API**: OpenWeatherMap API
- **Deployment**: Vercel

## API Integration (OpenWeatherMap)

- This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch real-time weather and forecast data.
- You’ll need to sign up and get a free API key from their website.
- Once you have the key, create a `.env` file in the root of your project and add:
  ```env
  VITE_API_KEY=your_api_key_here



## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
   npm install

2. Set up environment variables:
Create a .env file in the root directory and add your OpenWeatherMap API key:
VITE_API_KEY=your_api_key_here

3. Run the app locally:
npm run dev

4. Build for production:
npm run build

# API Rate Limits
Free Tier: 60 requests/minute
You must sign up for a free OpenWeatherMap account and generate your API key.

 Features
Search weather by city name

Current weather: temperature, condition, humidity, wind speed

Weather icons from OpenWeatherMap

5-day forecast (every 3-hour interval, sampled to daily)

Recent search history (last 5 cities)

Geolocation support (get weather for your current location)

Light/Dark theme toggle (optional)

Loader and error state handling

Responsive design for mobile and desktop