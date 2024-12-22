const { Avenue } = require("../../models");

class AvenueDAO {
  static async getAvenueById(avenueId) {
    console.log("avenueId", avenueId);
    return await Avenue.findOne({ where: { id: avenueId } });
  }

  static async getAvenueEventsById(id) {
    console.log("id", id);
    return await Avenue.findOne({ where: { id }, include: "events" });
  }

  static async getAllAvenues() {
    return await Avenue.findAll();
  }

  static async createAvenue(data) {
    return await Avenue.create(data);
  }

  static async updateAvenue(id, data) {
    return await Avenue.update(data, { where: { id } });
  }

  static async deleteAvenue(id) {
    return await Avenue.destroy({ where: { id } });
  }
}

module.exports = AvenueDAO;
