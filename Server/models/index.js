const sequelize = require('../config/config'); // Import the sequelize instance from config
const Sequelize = require('sequelize'); // Import Sequelize

const Property = require('./Property')(sequelize, Sequelize.DataTypes);
const Tenant = require('./Tenant')(sequelize, Sequelize.DataTypes);
const RentalPayment = require('./RentalPayment')(sequelize, Sequelize.DataTypes);
const User = require('./User')(sequelize, Sequelize.DataTypes)

if (Tenant.associate) {
  Tenant.associate({Property, RentalPayment });
}

if (RentalPayment.associate) {
  RentalPayment.associate({ Tenant });
}

module.exports = {
  sequelize,
  Property,
  Tenant,
  RentalPayment,
  User,
};
