const router = require("express").Router();
const authController = require("../controllers/authController");
const { authentication } = require("../middlewares/authentications");

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
