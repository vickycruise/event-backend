const express = require("express");
const router = express.Router();
const TicketController = require("../src/controllers/TicketController");
const {
  createTicketValidator,
  getTicketByIdValidator,
  getTicketsByEventIdValidator,
  updateTicketValidator,
  deleteTicketValidator,
} = require("../routes/validator/tickerValidator"); // Import validators

// Create a new ticket with validation
router.post("/create", createTicketValidator, TicketController.createTicket);

// Get ticket by ID with validation

router.get("/:id", getTicketByIdValidator, TicketController.getTicketById);

// Get tickets by Event ID with validation
router.get(
  "/:eventId/tickets",
  getTicketsByEventIdValidator,
  TicketController.getTicketsByEventId
);

// Update ticket by ID with validation
router.put("/:id", updateTicketValidator, TicketController.updateTicket);

// Delete ticket by ID with validation
router.delete("/:id", deleteTicketValidator, TicketController.deleteTicket);
router.get("/", TicketController.getAllTickets);

module.exports = router;
