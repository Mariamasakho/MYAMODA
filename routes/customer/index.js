const router = require("express").Router();
const authenticate = require("../../utils/middlewares/authUser");
const controllers = require("./controller");

router.get("/login", controllers.getlogin);
router.get("/register", controllers.getregister);
router.post("/login", controllers.login);
router.post("/register", controllers.register);

router.get("", controllers.home);
router.get("/addcart/:id/", authenticate, controllers.addCart);
router.get("/cart", authenticate, controllers.cart);
router.get("/cart/:id", authenticate, controllers.removeCart);
router.get("/checkout", authenticate, controllers.getCheckout);
router.post("/checkout", controllers.checkout);
router.get("/products/", controllers.getProducts);
router.get("/contact/", controllers.contact);


module.exports = router;
