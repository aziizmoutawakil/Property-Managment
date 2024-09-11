// initDatabase.js
const { sequelize } = require('./models/index');

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
