const express = require("express");
const RegistrationController = require("../src/controllers/RegistrationController.js");
const {
  registrationValidator,
  registrationIdValidator,
  validate,
} = require("../routes/validator/registrationValidator.js");

const router = express.Router();

// Create a new registration
router.post(
  "/create",
  registrationValidator,
  validate, // Middleware to check for validation errors
  RegistrationController.createRegistrationWithTicket
);

// Update a registration by ID
router.put(
  "/:registrationId",
  registrationIdValidator,
  registrationValidator,
  validate, // Middleware to check for validation errors
  RegistrationController.updateRegistration
);

// Delete a registration by ID
router.delete(
  "/:registrationId",
  registrationIdValidator,
  validate, // Middleware to check for validation errors
  RegistrationController.deleteRegistration
);

// Get all registrations
router.get("/", RegistrationController.getAllRegistrations);

// Get registration details by ID
router.get("/:registrationId", RegistrationController.getRegistrationById);

module.exports = router;
