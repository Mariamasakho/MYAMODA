module.exports = (wagner) => {
  wagner.factory("AdminManager", () => {
    const Manager = require("./AdminManager");
    return new Manager(wagner);
  });

  wagner.factory("ProductManager", () => {
    const Manager = require("./ProductManager");
    return new Manager(wagner);
  });

  wagner.factory("CustomerManager", () => {
    const Manager = require("./CustomerManager");
    return new Manager(wagner);
  });

  wagner.factory("OrderManager", () => {
    const Manager = require("./OrderManager");
    return new Manager(wagner);
  });
};
