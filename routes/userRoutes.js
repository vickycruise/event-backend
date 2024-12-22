const express = require("express");
const UserController = require("../src/controllers/UserController");

const router = express.Router();

router.post("/", UserController.createUser);

router.get("/", (req, res, next) => {
  if (req.query.id) {
    UserController.getUserById(req, res, next);
  } else {
    UserController.getAllUsers(req, res, next);
  }
});

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
