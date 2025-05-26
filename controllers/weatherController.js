const weatherService = require('../services/weatherService');
const { validateCity } = require('../utils/helpers');

const weatherController = {
  // Get current weather
  getCurrentWeather: async (req, res) => {
    try {
      const { city } = req.params;
      
      if (!validateCity(city)) {
        return res.status(400).json({ error: 'Invalid city name' });
      }

      const weatherData = await weatherService.getCurrentWeather(city);
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching current weather:', error.message);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  },

  // Get 5-day forecast
  getForecast: async (req, res) => {
    try {
      const { city } = req.params;
      
      if (!validateCity(city)) {
        return res.status(400).json({ error: 'Invalid city name' });
      }

      const forecastData = await weatherService.getForecast(city);
      res.json(forecastData);
    } catch (error) {
      console.error('Error fetching forecast:', error.message);
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