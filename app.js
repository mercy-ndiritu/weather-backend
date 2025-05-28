const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:5173', 'https://weather-app-frontend-seven-self.vercel.app'],
  credentials: true
}));

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/weather', require('./routes/weather'));


app.get('/', (req, res) => {
  res.json({ message: 'Weather API is running!' });
});

module.exports = app;