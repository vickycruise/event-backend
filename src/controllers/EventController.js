// controllers/eventController.js
const eventDAO = require("../dao/EventDao");

const eventController = {
  // Create a new event
  async createEvent(req, res) {
    try {
      const { title, statDate, endDate, location, description } = req.body;

      // Business logic validation: Ensure start date is before end date
      if (new Date(statDate) > new Date(endDate)) {
        return res
          .status(400)
          .json({ error: "Start date cannot be after end date" });
      }

      // Create the event
      const event = await eventDAO.createEvent({
        title,
        statDate,
        endDate,
        location,
        description,
      });

      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Retrieve all events
  async getAllEvents(req, res) {
    try {
      const events = await eventDAO.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Retrieve a single event by ID
  async getEventById(req, res) {
    try {
      const event = await eventDAO.getEventById(req.params.id);

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update an event by ID
  async updateEvent(req, res) {
    try {
      const { title, statDate, endDate, location, description } = req.body;

      // Business logic validation: Ensure start date is before end date
      if (statDate && endDate && new Date(statDate) > new Date(endDate)) {
        return res
          .status(400)
          .json({ error: "Start date cannot be after end date" });
      }

      // Update the event
      const rowsUpdated = await eventDAO.updateEvent(req.params.id, {
        title,
        statDate,
        endDate,
        location,
        description,
      });

      if (rowsUpdated[0]) {
        res.status(200).json({ message: "Event updated successfully" });
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete an event by ID
  async deleteEvent(req, res) {
    try {
      const rowsDeleted = await eventDAO.deleteEvent(req.params.id);

      if (rowsDeleted) {
        res.status(200).json({ message: "Event deleted successfully" });
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = eventController;
