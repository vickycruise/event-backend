const AvenueDAO = require("../dao/AvenueDao");

class AvenueController {
  static async createAvenue(req, res) {
    try {
      const { name, address } = req.body;
      if (!name || !address) {
        return res
          .status(400)
          .json({ error: "Missing required fields: name and address" });
      }

      const avenue = await AvenueDAO.createAvenue(req.body);
      res.status(201).json(avenue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAvenueById(req, res) {
    try {
      const avenue = await AvenueDAO.getAvenueById(req.params.id);
      if (!avenue) {
        return res.status(404).json({ error: "Avenue not found" });
      }
      res.json(avenue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAvenueEventsById(req, res) {
    const { avenueId } = req.query;
    if (!avenueId) {
      return res
        .status(400)
        .json({ error: "Missing query parameter: avenueId" });
    }

    try {
      const avenue = await AvenueDAO.getAvenueEventsById(avenueId);
      if (!avenue) {
        return res.status(404).json({ error: "Avenue not found" });
      }
      res.json(avenue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllAvenues(req, res) {
    try {
      const avenues = await AvenueDAO.getAllAvenues();
      res.json(avenues);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateAvenue(req, res) {
    try {
      const { name, address } = req.body;
      if (!name && !address) {
        return res.status(400).json({ error: "No fields to update" });
      }

      const rowsUpdated = await AvenueDAO.updateAvenue(req.params.id, req.body);
      if (rowsUpdated[0] === 0) {
        return res.status(404).json({ error: "Avenue not found" });
      }
      res.json({ message: "Avenue updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteAvenue(req, res) {
    try {
      const rowsDeleted = await AvenueDAO.deleteAvenue(req.params.id);
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: "Avenue not found" });
      }
      res.json({ message: "Avenue deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AvenueController;
