const controllers = {};
const wagner = require("wagner-core");

controllers.getlogin = async (req, res) => {
  res.render("customer/login", { error: false });
};

controllers.login = async (req, res) => {
  try {
    const user = await wagner
      .get("CustomerManager")
      .login({ username: req.body.username, password: req.body.password });

    req.session.regenerate(function (err) {
      if (err) next(err);
      req.session.customer = user;
      req.session.save(function (err) {
        if (err) return next(err);
        res.redirect("/");
      });
    });
  } catch (error) {
    res.render("customer/login", { error: error.message });
  }
};

controllers.getregister = async (req, res) => {
  res.render("customer/register", { error: false });
};

controllers.register = async (req, res) => {
  try {
    const user = await wagner.get("CustomerManager").register(req.body);

    req.session.regenerate(function (err) {
      if (err) next(err);
      req.session.customer = user;
      req.session.save(function (err) {
        if (err) return next(err);
        res.redirect("/");
      });
    });
  } catch (error) {
    res.render("customer/register", { error: error.message });
  }
};

controllers.home = async (req, res) => {
  const products = await wagner.get("ProductManager")._findAll();
  req.essentials.activeRoute = "/";
  res.render("customer/home", { products, ...req.essentials });
};

controllers.addCart = async (req, res) => {
  if (!req.essentials.isAuthenticated) return res.redirect("/login");

  const product = await wagner
    .get("ProductManager")
    ._findOne({ id: req.params.id });

  const alreadyExists = await wagner
    .get("OrderManager")
    ._findOne({ productName: product.name, type: "cart" });

  if (alreadyExists) {
    const value = req.query.int ? parseInt(req.query.int) : 1;

    if (alreadyExists.quantity === 1 && value === -1)
      return redirect("/cart/" + alreadyExists.id);

    await wagner
      .get("OrderManager")
      ._editOne({ quantity: alreadyExists.quantity + value }, alreadyExists.id);
    return res.redirect("/cart");
  }

  const order = {
    type: "cart",
    quantity: 1,
    userId: req.session.customer.id,
    userName: req.session.customer.username,
    productName: product.name,
    image: product.image,
    price: product.price,
  };

  await wagner.get("OrderManager")._createOne(order);

  res.redirect("/cart");
};

controllers.cart = async (req, res) => {
  req.essentials.activeRoute = "/cart";
  res.render("customer/cart", { error: false, ...req.essentials });
};

controllers.removeCart = async (req, res) => {
  await wagner.get("OrderManager")._destroy({ id: req.params.id });
  res.redirect("/cart");
};

controllers.getCheckout = async (req, res) => {
  res.render("customer/checkout", { error: false, ...req.essentials });
};

controllers.checkout = async (req, res) => {
  const orders = await wagner
    .get("OrderManager")
    ._findAll({ where: { userId: req.session.customer.id, type: "cart" } });

  if (!orders) return res.redirect("/");

  orders.forEach(async (order) => {
    await wagner
      .get("OrderManager")
      ._editOne({ ...req.body, type: "ordered" }, order.id);
  });

  res.redirect("/");
};

controllers.getProducts = async (req, res) => {
  const products = await wagner.get("ProductManager")._findAll();
  req.essentials.activeRoute = "/";
  res.render("customer/products", { products, ...req.essentials });
};

controllers.contact = async (req, res) => {
  req.essentials.activeRoute = "/contact";
  res.render("customer/contact", {...req.essentials });
};



module.exports = controllers;
