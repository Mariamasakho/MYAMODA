const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    status: { type: DataTypes.BOOLEAN, defaultValue: false}
  });

  return User;
};
