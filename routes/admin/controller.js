const wagner = require("wagner-core");
const controllers = {};

controllers.adminLogin = (req, res) => {
  res.render("admin/login", { error: false });
};

controllers.postLogin = async (req, res) => {
  try {
    const user = await wagner.get("AdminManager").login(req.body);

    req.session.regenerate(function (err) {
      if (err) next(err);
      req.session.user = user;
      req.session.save(function (err) {
        if (err) return next(err);
        res.redirect("/admin/dashboard");
      });
    });
  } catch (error) {
    res.render("admin/login", { error: error.message });
  }
};

controllers.dashboard = async (req, res) => {
  const orders = await wagner
    .get("OrderManager")
    ._findAll({ where: { type: ["ordered", "delivered"] } });

  res.render("admin/dashboard", { orders });
};

controllers.products = async (req, res) => {
  const products = await wagner.get("ProductManager")._findAll();
  res.render("admin/product", { products: products });
};

controllers.removeProduct = async (req, res) => {
  await wagner.get("ProductManager")._destroy({ id: req.params.productId });

  const products = await wagner.get("ProductManager")._findAll();
  res.render("admin/product", { products: products });
};

controllers.getAddProduct = (req, res) => {
  res.render("admin/addProduct", { error: false, product: false });
};

controllers.editProduct = async (req, res) => {
  try {
    const product = await wagner
      .get("ProductManager")
      ._findOne({ id: req.params.productId });
    if (!product)
      return res.render("admin/addProduct", {
        error: "Invalid product!",
        product: true,
      });

    res.render("admin/addProduct", { error: false, product: product.toJSON() });
  } catch (error) {
    res.render("admin/addProduct", { error: error.message, product: false });
  }
};

controllers.addProduct = async (req, res) => {
  try {
    const imageUrl = req.file;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const productId = req.body.productId;

    const product = await wagner
      .get("ProductManager")
      ._findOne({ id: productId });

    if (!imageUrl && !productId)
      return res.render("admin/addProduct", {
        error: "Invalid file format!",
        product: false,
      });

    await wagner.get("ProductManager").createOrEditProduct({
      name,
      price,
      category,
      productId,
      image: !imageUrl && product ? product.image : "/" + imageUrl.path,
    });
    res.redirect("/admin/products");
  } catch (error) {
    res.render("admin/addProduct", { error: error.message, product: false });
  }
};

controllers.customers = async (req, res) => {
  try {
    if (req.query.id) {
      await wagner
        .get("CustomerManager")
        ._editOne({ status: true }, req.query.id);
    }

    const customers = await wagner
      .get("CustomerManager")
      ._findAll({ where: { status: false } });
    res.render("admin/customers", { customers });
  } catch (error) {
    res.render("admin/customers", { error: error.message });
  }
};

controllers.orderStatus = async (req, res) => {
  await wagner
    .get("OrderManager")
    ._editOne({ type: "delivered" }, req.params.id);
  res.redirect("/admin/dashboard");
};

controllers.logout = (req, res) => {
  req.session.destroy();

  res.redirect("/admin/");
};

module.exports = controllers;
