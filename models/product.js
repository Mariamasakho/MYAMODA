const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("product", {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    image:DataTypes.STRING
  });
  return Product;
};
