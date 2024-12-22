const eventDAO = require("../dao/EventDao");

const eventController = {
  // Create a new event
  async createEvent(req, res) {
    try {
      const { title, statDate, endDate, location, description, avenueId } =
        req.body;

      // Business logic validation: Ensure start date is before end date
      if (new Date(statDate) > new Date(endDate)) {
        return res
          .status(400)
          .json({ error: "Start date cannot be after end date" });
      }

      // Ensure all required fields are present
      if (!title || !statDate || !endDate || !location || !avenueId) {
        return res
          .status(400)
          .json({ error: "All required fields must be provided" });
      }

      // Create the event
      const event = await eventDAO.createEvent({
        title,
        statDate,
        endDate,
        location,
        description,
        avenueId,
      });

      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res
        .status(500)
        .json({ error: "Failed to create event", details: error.message });
    }
  },

  // Retrieve all events
  async getAllEvents(req, res) {
    try {
      const events = await eventDAO.getAllEvents();
      if (events.length === 0) {
        return res.status(404).json({ error: "No events found" });
      }
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve events", details: error.message });
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
      console.error("Error fetching event:", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve event", details: error.message });
    }
  },

  // Update an event by ID
  async updateEvent(req, res) {
    try {
      const { title, statDate, endDate, location, description, avenueId } =
        req.body;

      // Business logic validation: Ensure start date is before end date
      if (statDate && endDate && new Date(statDate) > new Date(endDate)) {
        return res
          .status(400)
          .json({ error: "Start date cannot be after end date" });
      }

      // Ensure all required fields are present (if updating)
      if (
        title === undefined ||
        location === undefined ||
        avenueId === undefined
      ) {
        return res
          .status(400)
          .json({ error: "Title, location, and avenueId are required fields" });
      }

      // Update the event
      const rowsUpdated = await eventDAO.updateEvent(req.params.id, {
        title,
        statDate,
        endDate,
        location,
        description,
        avenueId,
      });

      if (rowsUpdated[0]) {
        res.status(200).json({ message: "Event updated successfully" });
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      res
        .status(500)
        .json({ error: "Failed to update event", details: error.message });
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
      console.error("Error deleting event:", error);
      res
        .status(500)
        .json({ error: "Failed to delete event", details: error.message });
    }
  },
};

module.exports = eventController;
