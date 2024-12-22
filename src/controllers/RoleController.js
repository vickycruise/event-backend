const RoleDAO = require("../dao/RoleDao");
class RoleController {
  static async createRole(req, res) {
    try {
      const role = await RoleDAO.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRoleById(req, res) {
    try {
      const role = await RoleDAO.getRoleById(req.params.id);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateRole(req, res) {
    try {
      const rowsUpdated = await RoleDAO.updateRole(req.params.id, req.body);
      if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Role not found" });
      }
      res.json({ message: "Role updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteRole(req, res) {
    try {
      const rowsDeleted = await RoleDAO.deleteRole(req.params.id);
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: "Role not found" });
      }
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllRoles(req, res) {
    try {
      const roles = await RoleDAO.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = RoleController;
