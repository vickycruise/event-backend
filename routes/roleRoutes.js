const express = require("express");
const RoleController = require("../src/controllers/RoleController");

const router = express.Router();

// Create a new role
router.post("/", RoleController.createRole);

// Get a role by ID
router.get("/:id", RoleController.getRoleById);

// Update a role by ID
router.put("/:id", RoleController.updateRole);

// Delete a role by ID
router.delete("/:id", RoleController.deleteRole);

// Get all roles
router.get("/", RoleController.getAllRoles);

module.exports = router;
