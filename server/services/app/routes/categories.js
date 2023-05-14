const router = require("express").Router();
const categoriesController = require("../controllers/categoriesController");
const { authentication } = require("../middlewares/authentications");

router.get("/", categoriesController.getCategories);
router.post("/", categoriesController.postCategory);
router.get("/:id", categoriesController.detailCategory);
router.put("/:id", categoriesController.editCategory);
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
