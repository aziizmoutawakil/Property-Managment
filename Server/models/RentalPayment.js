module.exports = (sequelize, DataTypes) => {
  const RentalPayment = sequelize.define('RentalPayment', {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tenantId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tenants',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',  
    },
    status: {
      type: DataTypes.ENUM('paid', 'unpaid'),
      defaultValue: 'unpaid',
      allowNull: false,
    },
  });

  RentalPayment.associate = (models) => {
    RentalPayment.belongsTo(models.Tenant, {
      foreignKey: 'tenantId',
      as: 'tenant',
      onDelete: 'CASCADE',  
    });
  };

  return RentalPayment;
};
