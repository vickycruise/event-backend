const { sequelize } = require("../../models"); // Import the sequelize instance
const {
  createRegistration,
  getRegistrationById,
  getAllRegistrations,
  updateRegistration: updateRegistrationById, // Rename to avoid conflict
  deleteRegistration: deleteRegistrationById, // Rename to avoid conflict
} = require("../dao/RegistrationDao"); // Import registrationDAO methods
const { createTicket } = require("../dao/TicketDao"); // Import ticketDAO methods

class RegistrationController {
  // Create registration along with a new ticket
  static async createRegistrationWithTicket(req, res) {
    const { userId, eventId, price, seat } = req.body; // Assuming ticket data comes from the request body
    console.log(req.body, "req.body");

    const t = await sequelize.transaction(); // Start transaction
    try {
      // Create ticket first
      const ticketData = { userId, eventId, price, seat }; // Assuming price is provided in the body
      const ticket = await createTicket(ticketData); // Pass the transaction
      console.log(ticket, "ticket");

      // Create registration using the created ticket
      const registration = await createRegistration(
        userId,
        eventId,
        ticket.id,
        { transaction: t } // Pass the transaction
      );

      // Commit the transaction
      await t.commit();
      return res.status(201).json({
        message: "Registration and ticket created successfully",
        registration,
        ticket,
      });
    } catch (error) {
      // Rollback the transaction in case of error
      await t.rollback();
      console.error("Error creating registration with ticket:", error);
      return res.status(500).json({
        message: "Failed to create registration with ticket",
        error: error.message,
      });
    }
  }

  // Update registration by ID
  static async updateRegistration(req, res) {
    const { registrationId } = req.params;
    const updateData = req.body;

    try {
      const updatedRegistration = await updateRegistrationById(
        registrationId,
        updateData
      ); // Use the renamed function
      return res.status(200).json({
        message: "Registration updated successfully",
        updatedRegistration,
      });
    } catch (error) {
      console.error("Error updating registration:", error);
      return res
        .status(500)
        .json({ message: "Error updating registration", error: error.message });
    }
  }

  // Delete registration by ID
  static async deleteRegistration(req, res) {
    const { registrationId } = req.params;

    try {
      const result = await deleteRegistrationById(registrationId); // Use the renamed function
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting registration:", error);
      return res
        .status(500)
        .json({ message: "Error deleting registration", error: error.message });
    }
  }

  // Get all registrations
  static async getAllRegistrations(req, res) {
    try {
      const registrations = await getAllRegistrations();
      return res.status(200).json(registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return res.status(500).json({
        message: "Error fetching registrations",
        error: error.message,
      });
    }
  }
  static async getRegistrationById(req, res) {
    const { registrationId } = req.params;

    try {
      const registration = await getRegistrationById(registrationId);
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }
      return res.status(200).json(registration);
    } catch (error) {
      console.error("Error fetching registration:", error);
      return res.status(500).json({
        message: "Error fetching registration",
        error: error.message,
      });
    }
  }
}
module.exports = RegistrationController;
