const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get current weather by city
router.get('/current/:city', weatherController.getCurrentWeather);

// Get 5-day forecast by city
router.get('/forecast/:city', weatherController.getForecast);

// Search cities (autocomplete)
router.get('/search/:query', weatherController.searchCities);

// Add these routes to handle coordinates
router.get('/current/coordinates', weatherController.getCurrentWeatherByCoords);

router.get('/forecast/coordinates', weatherController.getForecastByCoords);

module.exports = router;