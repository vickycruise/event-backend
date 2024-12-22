const { Role, User } = require("../../models");

class RoleDAO {
  static async createRole(roleDetails) {
    return await Role.create(roleDetails);
  }

  static async getRoleById(roleId) {
    return await Role.findOne({
      where: { id: roleId },
      include: [{ model: User, as: "users" }],
    });
  }

  static async getAllRoles() {
    return await Role.findAll({
      include: [{ model: User, as: "users" }],
    });
  }

  static async updateRole(roleId, updatedData) {
    const [rowsUpdated] = await Role.update(updatedData, {
      where: { id: roleId },
    });
    return rowsUpdated;
  }

  static async deleteRole(roleId) {
    return await Role.destroy({ where: { id: roleId } });
  }
}

module.exports = RoleDAO;
