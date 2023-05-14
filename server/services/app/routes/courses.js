const router = require("express").Router();
const productsController = require("../controllers/productsController");
const { authentication } = require("../middlewares/authentications");

router.get("/", productsController.getCourses);
router.post("/", productsController.postCourse);
router.get("/:id", productsController.getDetailCourse);
router.put("/:id", productsController.editCourse);
router.delete("/:id", productsController.deleteCourse);

module.exports = router;
