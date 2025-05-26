const axios = require('axios');

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherService = {
  // Get current weather
  getCurrentWeather: async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });

      const data = response.data;
      return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        minTemp: Math.round(data.main.temp_min),
        maxTemp: Math.round(data.main.temp_max),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('City not found');
      }
      throw new Error('Failed to fetch weather data');
    }
  },

  // Get 5-day forecast
  getForecast: async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });

      const data = response.data;
      const forecast = [];
      
      // Group by day (take one forecast per day)
      const dailyData = data.list.filter((item, index) => index % 8 === 0);
      
      dailyData.slice(0, 5).forEach(item => {
        const date = new Date(item.dt * 1000);
        forecast.push({
          date: date.toLocaleDateString(),
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          temperature: Math.round(item.main.temp),
          minTemp: Math.round(item.main.temp_min),
          maxTemp: Math.round(item.main.temp_max),
          condition: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        });
      });

      return {
        city: data.city.name,
        country: data.city.country,
        forecast
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('City not found');
      }
      throw new Error('Failed to fetch forecast data');
    }
  },

  // Search cities (using geocoding API)
  searchCities: async (query) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY
        }
      });

      return response.data.map(city => ({
        name: city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon
      }));
    } catch (error) {
      throw new Error('Failed to search cities');
    }
  }
};

module.exports = weatherService;