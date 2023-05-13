const wagner = require("wagner-core");
module.exports = async (req, res, next) => {
  const essentials = {
    isAuthenticated: false,
    cartProducts: [],
    activeRoute: `${req.originalUrl}`.substring(1),
    totalPrice: 0
  };

  if (req.session.customer) {
    essentials.isAuthenticated = req.session.customer;

    const carts = await wagner
      .get("OrderManager")
      ._findAll({ where: { userId: req.session.customer.id, type: "cart" } });

    let total = 0

    carts.map((item) => {
      const price = item.price * item.quantity
      total += price
    })

    essentials.cartProducts = carts;

    essentials.totalPrice = total
  }

  req.essentials = essentials;
  next();
};
