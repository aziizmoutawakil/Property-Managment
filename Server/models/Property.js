module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_of_units: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rental_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'Properties', 
    timestamps: true,
  });

  Property.associate = (models) => {
    Property.hasMany(models.Tenant, {
      foreignKey: 'propertyId',
      as: 'tenants',
      onDelete: 'CASCADE', 
    });
  };

  return Property;
};
