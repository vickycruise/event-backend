const TicketService = require("../dao/TicketDao"); // Replace with the correct path
const { validationResult } = require("express-validator"); // For input validation

// Create a new ticket
async function createTicket(req, res) {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticketData = req.body;

    // Call the service layer
    const ticket = await TicketService.createTicket(ticketData);

    return res.status(201).json({
      message: "Ticket created successfully",
      data: ticket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({
      message: "Failed to create ticket",
      error: error.message,
    });
  }
}

// Get ticket by ID
async function getTicketById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Ticket ID is required",
      });
    }

    const ticket = await TicketService.getTicketById(id);

    return res.status(200).json({
      message: "Ticket retrieved successfully",
      data: ticket,
    });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    const statusCode = error.message === "Ticket not found" ? 404 : 500;
    return res.status(statusCode).json({
      message: "Failed to retrieve ticket",
      error: error.message,
    });
  }
}

// Get all tickets by event ID
async function getTicketsByEventId(req, res) {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({
        message: "Event ID is required",
      });
    }

    const tickets = await TicketService.getTicketsByEventId(eventId);

    return res.status(200).json({
      message: "Tickets retrieved successfully",
      data: tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets by event ID:", error);
    return res.status(500).json({
      message: "Failed to retrieve tickets",
      error: error.message,
    });
  }
}

// Update ticket by ID
async function updateTicket(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Ticket ID is required",
      });
    }

    const updatedTicket = await TicketService.updateTicket(id, updateData);

    return res.status(200).json({
      message: "Ticket updated successfully",
      data: updatedTicket,
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    const statusCode = error.message === "Ticket not found" ? 404 : 500;
    return res.status(statusCode).json({
      message: "Failed to update ticket",
      error: error.message,
    });
  }
}

// Delete ticket by ID
async function deleteTicket(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Ticket ID is required",
      });
    }

    const deletedTicket = await TicketService.deleteTicket(id);

    return res.status(200).json({
      message: "Ticket deleted successfully",
      data: deletedTicket,
    });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    const statusCode = error.message === "Ticket not found" ? 404 : 500;
    return res.status(statusCode).json({
      message: "Failed to delete ticket",
      error: error.message,
    });
  }
}

async function getAllTickets(req, res) {
  try {
    const tickets = await TicketService.getAllTickets();
    return res.status(200).json({ data: tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({ error: error.message });
  }
}
module.exports = {
  createTicket,
  getTicketById,
  getTicketsByEventId,
  getAllTickets,
  updateTicket,
  deleteTicket,
};
