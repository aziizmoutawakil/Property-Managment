module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Properties',
        key: 'id',
      },
      onDelete: 'CASCADE',  
    },
  });

  Tenant.associate = (models) => {
    Tenant.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      as: 'property',
      onDelete: 'CASCADE',  
    });
    Tenant.hasMany(models.RentalPayment, {
      foreignKey: 'tenantId',
      as: 'payments',
      onDelete: 'CASCADE', 
    });
  };

  return Tenant;
};
