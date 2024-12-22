const { User, Role } = require("../../models");

class UserDAO {
  static async createUser(userDetails) {
    return await User.create(userDetails);
  }

  static async getUserById(userId) {
    return await User.findOne({
      where: { id: userId },
      include: [{ model: Role, as: "role" }],
    });
  }

  static async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async updateUser(userId, updatedData) {
    const [rowsUpdated] = await User.update(updatedData, {
      where: { id: userId },
    });
    return rowsUpdated;
  }

  static async deleteUser(userId) {
    return await User.destroy({ where: { id: userId } });
  }

  static async getAllUsers() {
    return await User.findAll({
      include: [{ model: Role, as: "role" }],
    });
  }
}

module.exports = UserDAO;
