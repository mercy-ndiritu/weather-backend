const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get current weather by city
router.get('/current/:city', weatherController.getCurrentWeather);

// Get 5-day forecast by city
router.get('/forecast/:city', weatherController.getForecast);

// Search cities (autocomplete)
router.get('/search/:query', weatherController.searchCities);

module.exports = router;