module.exports = (sequelize, DataTypes) => {
  const Avenue = sequelize.define("Avenue", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Avenue.associate = (models) => {
    Avenue.hasMany(models.Event, {
      foreignKey: "avenueId",
      as: "events",
    });
  };

  return Avenue;
};
