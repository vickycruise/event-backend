// src/validators/ticketValidator.js
const { body, param } = require("express-validator");

const createTicketValidator = [
  body("userId")
    .isInt({ gt: 0 })
    .withMessage("User ID must be a positive integer."),
  body("eventId")
    .isInt({ gt: 0 })
    .withMessage("Event ID must be a positive integer."),
  body("price")
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage(
      "Price must be a valid decimal number with up to two decimal places."
    ),
];

const getTicketByIdValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Ticket ID must be a positive integer."),
];

const getTicketsByEventIdValidator = [
  param("eventId")
    .isInt({ gt: 0 })
    .withMessage("Event ID must be a positive integer."),
];

const updateTicketValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Ticket ID must be a positive integer."),
  body("price")
    .optional()
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage(
      "Price must be a valid decimal number with up to two decimal places."
    ),
];

const deleteTicketValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Ticket ID must be a positive integer."),
];

module.exports = {
  createTicketValidator,
  getTicketByIdValidator,
  getTicketsByEventIdValidator,
  updateTicketValidator,
  deleteTicketValidator,
};
