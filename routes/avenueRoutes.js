const express = require("express");
const AvenueController = require("../src/controllers/AvenueController");

const router = express.Router();

// Create a new avenue
router.post("/", AvenueController.createAvenue);

// Get avenue events by query parameter avenueId
router.get("/events", AvenueController.getAvenueEventsById);

// Get all avenues
router.get("/", AvenueController.getAllAvenues);

// Get an avenue by ID
router.get("/:id", AvenueController.getAvenueById);

// Update an avenue by ID
router.put("/:id", AvenueController.updateAvenue);

// Delete an avenue by ID
router.delete("/:id", AvenueController.deleteAvenue);

module.exports = router;
