const express = require("express");
const { check, validationResult } = require("express-validator");
const eventController = require("../src/controllers/EventController");

const router = express.Router();

// Validation middleware for creating and updating events
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
  check("avenueId")
    .notEmpty()
    .withMessage("Avenue ID is required")
    .isInt()
    .withMessage("Avenue ID must be an integer"),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation middleware for updating an event
const validateEventUpdate = [
  check("title").optional().notEmpty().withMessage("Title cannot be empty"),
  check("statDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid ISO8601 date"),
  check("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid ISO8601 date"),
  check("location")
    .optional()
    .notEmpty()
    .withMessage("Location cannot be empty"),
  check("avenueId")
    .optional()
    .isInt()
    .withMessage("Avenue ID must be an integer"),

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
router.post("/create", validateEvent, eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", validateEventUpdate, eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
