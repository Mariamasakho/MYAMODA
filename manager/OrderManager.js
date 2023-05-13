const OrmManager = require("./ORMManager");

class OrderManager extends OrmManager {
  constructor(wagner) {
    super(wagner.get("order"));
    this.wagner = wagner;
  }

}

module.exports = OrderManager;
