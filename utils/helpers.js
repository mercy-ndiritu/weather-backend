const helpers = {
  // Validate city name
  validateCity: (city) => {
    if (!city || typeof city !== 'string') return false;
    if (city.length < 2 || city.length > 50) return false;
    return /^[a-zA-Z\s\-',.]+$/.test(city);
  },

  // Format temperature
  formatTemp: (temp) => Math.round(temp),

  // Convert wind direction to compass
  windDirectionToCompass: (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  },

  // Format date
  formatDate: (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  }
};

module.exports = helpers;