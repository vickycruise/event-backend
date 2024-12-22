module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
  Event.associate = (models) => {
    Event.belongsTo(models.Avenue, { foreignKey: "avenueId" });
  };

  return Event;
};
