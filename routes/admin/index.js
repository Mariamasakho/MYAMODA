const express = require("express");
const authenticate = require("../../utils/middlewares/authAdmin");
const router = express.Router();
const controller = require("./controller");

router.get(
  "/",
  (req, res, next) =>
    req.session.user ? res.redirect("/admin/dashboard") : next(),
  controller.adminLogin
);
router.post(
  "/",
  (req, res, next) =>
    req.session.user ? res.redirect("/admin/dashboard") : next(),
  controller.postLogin
);

router.get("/dashboard",authenticate, controller.dashboard);
router.get("/products",authenticate, controller.products);
router.get("/addProduct",authenticate, controller.getAddProduct);
router.get("/editProduct/:productId",authenticate, controller.editProduct);
router.post("/addProduct",authenticate, controller.addProduct);
router.get("/removeProduct/:productId",authenticate, controller.removeProduct);

router.get("/customer",authenticate, controller.customers);
router.get("/orderStatus/:id",authenticate, controller.orderStatus);
router.get("/logout",authenticate, controller.logout);




module.exports = router;
