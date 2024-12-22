// routes/eventRoutes.js
const express = require("express");
const { check, validationResult } = require("express-validator");
const eventController = require("../src/controllers/EventController");

const router = express.Router();

// Validation middleware
const validateEvent = [
  check("title").notEmpty().withMessage("Title is required"),
  check("statDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid ISO8601 date"),
  check("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid ISO8601 date"),
  check("location").notEmpty().withMessage("Location is required"),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Define routes with validation
router.post("/", validateEvent, eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", validateEvent, eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
