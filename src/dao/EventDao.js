const { Event, Avenue } = require("../../models");

const eventDAO = {
  async createEvent(data) {
    return await Event.create(data);
  },

  async getAllEvents() {
    return await Event.findAll({
      include: [Avenue],
      order: [["statDate", "DESC"]], // Order by date in descending order
    });
  },

  async getEventById(eventId) {
    return await Event.findOne({ where: { id: eventId }, include: [Avenue] });
  },

  async updateEvent(eventId, data) {
    return await Event.update(data, { where: { id: eventId } });
  },

  async deleteEvent(eventId) {
    return await Event.destroy({ where: { id: eventId } });
  },
};

module.exports = eventDAO;
