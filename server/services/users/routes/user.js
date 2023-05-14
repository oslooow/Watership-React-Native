const router = require("express").Router();
const Controller = require("../controllers/userController");

router.get("/", Controller.getUsers);
router.post("/", Controller.postUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
