// dao/registrationDao.js
const { Registration, User, Event, Ticket } = require("../../models");

const createRegistration = async (userId, eventId, ticketId) => {
  try {
    const registration = await Registration.create({
      userId,
      eventId,
      ticketId,
    });
    return registration;
  } catch (error) {
    throw new Error("Error creating registration: " + error.message);
  }
};

const getRegistrationById = async (registrationId) => {
  try {
    const registration = await Registration.findOne({
      where: { id: registrationId },
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Event, attributes: ["id", "name", "date"] },
        { model: Ticket, attributes: ["id", "price"] },
      ],
    });
    return registration;
  } catch (error) {
    throw new Error("Error fetching registration: " + error.message);
  }
};

const updateRegistration = async (registrationId, updateData) => {
  try {
    const registration = await Registration.findByPk(registrationId);
    if (!registration) {
      throw new Error("Registration not found");
    }

    return await registration.update(updateData);
  } catch (error) {
    throw new Error("Error updating registration: " + error.message);
  }
};

const deleteRegistration = async (registrationId) => {
  try {
    const registration = await Registration.findByPk(registrationId);
    if (!registration) {
      throw new Error("Registration not found");
    }

    await registration.destroy();
    return { message: "Registration deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting registration: " + error.message);
  }
};

const getAllRegistrations = async () => {
  try {
    return await Registration.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Event, attributes: ["id", "name", "date"] },
        { model: Ticket, attributes: ["id", "price"] },
      ],
    });
  } catch (error) {
    throw new Error("Errors fetching registrations : " + error.message);
  }
};

module.exports = {
  createRegistration,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getAllRegistrations,
};
