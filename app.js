const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { syncModels } = require('./models');  // Import the syncModels function
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Sync models
syncModels()
  .then(() => {
    console.log('Database synced and ready.');
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });

// Export the app for testing purposes
module.exports = app;
