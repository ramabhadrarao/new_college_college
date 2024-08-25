const sequelize = require('../config/database');

// Import all your models here
const User = require('./User');
// Add more models here as you build them
// const Department = require('./Department');
// const Program = require('./Program');

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });  // Syncs all models to the database
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};

module.exports = {
  sequelize,
  User,
  // Export additional models here
  // Department,
  // Program,
  syncModels,
};
