const router = require("express").Router();
const lib = require('jarmlib');

const homeController = require("../controller/home");

router.get("/", lib.route.toHttps, homeController.index);

router.get("/login", lib.route.toHttps, homeController.login);
router.get("/signup", lib.route.toHttps, homeController.signup);
router.get("/logout", lib.route.toHttps, homeController.logout);

router.use("/user", require("./user"));
router.use("/admin", require("./admin"));
router.use("/department", require("./department"));
router.use("/product", require("./product"));
router.use("/feedstock", require("./feedstock"));
router.use("/customer", require("./customer"));
router.use("/sale", require("./sale"));
router.use("/ecommerce", require("./ecommerce"));
router.use("/financial", require("./financial"));

module.exports = router;