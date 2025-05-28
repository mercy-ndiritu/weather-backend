const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherService = {
  // Get current weather by city
  getCurrentWeather: async (city, units = 'metric') => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units: units,
          appid: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch weather for ${city}: ${error.message}`);
    }
  },

  // Get current weather by coordinates
  getCurrentWeatherByCoords: async (lat, lon, units = 'metric') => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat: lat,
          lon: lon,
          units: units,
          appid: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch weather for coordinates: ${error.message}`);
    }
  },

  // Get 5-day forecast by city
  getForecast: async (city, units = 'metric') => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: units,
          appid: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast for ${city}: ${error.message}`);
    }
  },

  // Get 5-day forecast by coordinates
  getForecastByCoords: async (lat, lon, units = 'metric') => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat: lat,
          lon: lon,
          units: units,
          appid: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast for coordinates: ${error.message}`);
    }
  },

  // Search cities (basic implementation)
  searchCities: async (query) => {
    try {
      // This is a simplified version - you might want to use a proper geocoding service
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: query,
          appid: API_KEY
        }
      });
      
      // Return city info for autocomplete
      return [{
        name: response.data.name,
        country: response.data.sys.country,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      }];
    } catch (error) {
      return []; // Return empty array if city not found
    }
  }
};

module.exports = weatherService;