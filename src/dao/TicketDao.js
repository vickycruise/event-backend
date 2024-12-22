const { Ticket, User, Event, Avenue } = require("../../models"); // Import models
const { Sequelize } = require("sequelize");

// async function createTicket(ticketData, options = {}) {
//   const t = await Ticket.sequelize.transaction(options);
//   try {
//     // Validate input (Example: Ensure userId, eventId, and price are valid)
//     if (!ticketData.userId || !ticketData.eventId) {
//       throw new Error("Missing required fields: userId and eventId.");
//     }

//     const ticket = await Ticket.create(ticketData, { transaction: t });
//     await t.commit();
//     return ticket;
//   } catch (error) {
//     await t.rollback();
//     console.error("Error creating ticket:", error);
//     throw error;
//   }
// }
async function createTicket(ticketData, options = {}) {
  try {
    // Validate input (Example: Ensure userId, eventId, and price are valid)
    if (!ticketData.userId || !ticketData.eventId) {
      throw new Error("Missing required fields: userId and eventId.");
    }

    const ticket = await Ticket.create(ticketData, options); // Use the provided transaction
    return ticket;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}

async function getTicketById(ticketId, options = {}) {
  try {
    if (!ticketId) throw new Error("Ticket ID is required.");

    const ticket = await Ticket.findOne({
      where: { id: ticketId },
      include: [
        { model: User, as: "User" },
        { model: Event, as: "Event" },
        { model: Avenue, as: "Avenue" },
      ],
      ...options,
    });

    if (!ticket) throw new Error(`Ticket with ID ${ticketId} not found.`);
    return ticket;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
}

async function getTicketsByEventId(eventId, options = {}) {
  try {
    if (!eventId) throw new Error("Event ID is required.");

    const tickets = await Ticket.findAll({
      where: { eventId },
      include: [{ model: User, as: "User" }],
      ...options,
    });

    return tickets;
  } catch (error) {
    console.error("Error fetching tickets by event ID:", error);
    throw error;
  }
}

async function updateTicket(ticketId, updateData, options = {}) {
  const t = await Ticket.sequelize.transaction(options);
  try {
    if (!ticketId) throw new Error("Ticket ID is required.");

    const ticket = await Ticket.findOne({
      where: { id: ticketId },
      transaction: t,
    });

    if (!ticket) throw new Error(`Ticket with ID ${ticketId} not found.`);
    await ticket.update(updateData, { transaction: t });
    await t.commit();

    return ticket;
  } catch (error) {
    await t.rollback();
    console.error("Error updating ticket:", error);
    throw error;
  }
}

async function deleteTicket(ticketId, options = {}) {
  const t = await Ticket.sequelize.transaction(options);
  try {
    if (!ticketId) throw new Error("Ticket ID is required.");

    const ticket = await Ticket.findOne({
      where: { id: ticketId },
      transaction: t,
    });

    if (!ticket) throw new Error(`Ticket with ID ${ticketId} not found.`);
    await ticket.destroy({ transaction: t });
    await t.commit();

    return ticket;
  } catch (error) {
    await t.rollback();
    console.error("Error deleting ticket:", error);
    throw error;
  }
}
async function getAllTickets(options = {}) {
  try {
    const tickets = await Ticket.findAll({
      include: [
        { model: User, as: "User" },
        { model: Event, as: "Event" },
        { model: Avenue, as: "Avenue" },
      ],
      ...options,
    });

    return tickets;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
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
