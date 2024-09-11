const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // Path to your SQLite file
  logging: false,
  define: {
    foreignKeyConstraints: true, // Enable foreign key constraints globally
  }
});

// Ensure foreign keys are enabled for each connection
sequelize.query('PRAGMA foreign_keys = ON');

module.exports = sequelize;
