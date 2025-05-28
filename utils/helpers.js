const validateCity = (city) => {
  if (!city || typeof city !== 'string') {
    return false;
  }
  
  // Remove extra spaces and check length
  const trimmedCity = city.trim();
  if (trimmedCity.length < 2 || trimmedCity.length > 100) {
    return false;
  }
  
  // Basic validation - allow letters, spaces, hyphens, apostrophes
  const cityRegex = /^[a-zA-Z\s\-',.]+$/;
  return cityRegex.test(trimmedCity);
};

const validateCoordinates = (lat, lon) => {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  
  if (isNaN(latitude) || isNaN(longitude)) {
    return false;
  }
  
  return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
};

module.exports = {
  validateCity,
  validateCoordinates
};