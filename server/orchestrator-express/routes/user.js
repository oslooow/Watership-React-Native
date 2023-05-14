const router = require("express").Router();

const Controller = require("../controllers/controller");

router.post("/", Controller.postUser);
router.get("/", Controller.getAllUsers);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
