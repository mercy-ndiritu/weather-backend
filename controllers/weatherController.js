const weatherService = require('../services/weatherService');
const { validateCity, validateCoordinates } = require('../utils/helpers');

const weatherController = {
  // Get current weather by city
  getCurrentWeather: async (req, res) => {
    try {
      const { city } = req.params;
      const { units = 'metric' } = req.query;
      
      if (!validateCity(city)) {
        return res.status(400).json({ error: 'Invalid city name' });
      }

      const weatherData = await weatherService.getCurrentWeather(city, units);
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching current weather:', error.message);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  },

  // Get current weather by coordinates
  getCurrentWeatherByCoords: async (req, res) => {
    try {
      const { lat, lon, units = 'metric' } = req.query;
      
      if (!validateCoordinates(lat, lon)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
      }

      const weatherData = await weatherService.getCurrentWeatherByCoords(lat, lon, units);
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error.message);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  },

  // Get 5-day forecast by city
  getForecast: async (req, res) => {
    try {
      const { city } = req.params;
      const { units = 'metric' } = req.query;
      
      if (!validateCity(city)) {
        return res.status(400).json({ error: 'Invalid city name' });
      }

      const forecastData = await weatherService.getForecast(city, units);
      res.json(forecastData);
    } catch (error) {
      console.error('Error fetching forecast:', error.message);
      res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
  },

  // Get 5-day forecast by coordinates
  getForecastByCoords: async (req, res) => {
    try {
      const { lat, lon, units = 'metric' } = req.query;
      
      if (!validateCoordinates(lat, lon)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
      }

      const forecastData = await weatherService.getForecastByCoords(lat, lon, units);
      res.json(forecastData);
    } catch (error) {
      console.error('Error fetching forecast by coordinates:', error.message);
      res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
  },

  // Search cities
  searchCities: async (req, res) => {
    try {
      const { query } = req.params;
      
      if (!query || query.length < 2) {
        return res.status(400).json({ error: 'Query must be at least 2 characters' });
      }

      const cities = await weatherService.searchCities(query);
      res.json(cities);
    } catch (error) {
      console.error('Error searching cities:', error.message);
      res.status(500).json({ error: 'Failed to search cities' });
    }
  }
};

module.exports = weatherController;