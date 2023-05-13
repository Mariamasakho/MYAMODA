const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define("order", {
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    price:DataTypes.INTEGER,
    productName:DataTypes.STRING,
    image:DataTypes.STRING,
    userName:DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      defaultValue:""
    },
    postcode: {
      type: DataTypes.STRING,
      defaultValue:""
    },
    address: {
      type: DataTypes.STRING,
      defaultValue:""
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue:""
    },
    payment: {
      type: DataTypes.STRING,
      defaultValue:"COD"
    },
    country: {
      type: DataTypes.STRING,
      defaultValue:""
    },
    state: {
      type: DataTypes.STRING,
      defaultValue:""
    },
  });

  return Order;
};
