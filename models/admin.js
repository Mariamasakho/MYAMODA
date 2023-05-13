const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Admin = sequelize.define("admin", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return Admin;
};
