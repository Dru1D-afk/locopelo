const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Favorite", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  }, { tableName: "favorites", timestamps: true });
};