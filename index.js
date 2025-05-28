const express = require('express');
const cors = require('cors');
require('dotenv').config();

const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Weather API is running!', timestamp: new Date().toISOString() });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🌤️  Weather API Server running on port ${PORT}`);
});