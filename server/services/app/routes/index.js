const router = require("express").Router();
const auth = require("./auth");
const courses = require("./courses");
const categories = require("./categories");

const errorHandler = require("../middlewares/errorHandler");

router.use("/auth", auth);
router.use("/courses", courses);
router.use("/categories", categories);

router.use(errorHandler);

module.exports = router;
