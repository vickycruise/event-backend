const { body, param, validationResult } = require("express-validator");

const registrationValidator = [
  body("userId")
    .isInt()
    .withMessage("UserId must be an integer")
    .notEmpty()
    .withMessage("UserId is required"),

  body("eventId")
    .isInt()
    .withMessage("EventId must be an integer")
    .notEmpty()
    .withMessage("EventId is required"),

  body("seat").optional().isString().withMessage("Seat must be a string"),

  body("price")
    .isDecimal()
    .withMessage("Price must be a decimal")
    .notEmpty()
    .withMessage("Price is required"),
  // Optionally you can add more validations depending on the requirements
  // For example:
  // body('seat').optional().isLength({ min: 1 }).withMessage('Seat must have at least 1 character')
];

const registrationIdValidator = [
  param("registrationId")
    .isInt()
    .withMessage("RegistrationId must be an integer"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registrationValidator,
  registrationIdValidator,
  validate,
};
