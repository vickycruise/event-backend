const UserDAO = require("../dao/UserDao");

class UserController {
  static async createUser(req, res) {
    try {
      // Input validation (can be customized based on your validation logic)
      if (
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.roleId
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if email already exists
      const existingUser = await UserDAO.getUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      // Create user
      const user = await UserDAO.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      console.log(req.query.id, "req.params.id");

      const user = await UserDAO.getUserById(req.query.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async updateUser(req, res) {
    try {
      // Input validation
      if (
        !req.body.name &&
        !req.body.email &&
        !req.body.password &&
        !req.body.roleId
      ) {
        return res.status(400).json({ error: "No fields to update" });
      }

      const rowsUpdated = await UserDAO.updateUser(req.params.id, req.body);
      if (rowsUpdated === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const rowsDeleted = await UserDAO.deleteUser(req.params.id);
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      console.log(req, "req");

      const users = await UserDAO.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
