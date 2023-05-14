const router = require("express").Router();
const user = require("./user");

const errorHandler = require("../middlewares/errorHandler");

router.use("/user", user);

router.use(errorHandler);

module.exports = router;
