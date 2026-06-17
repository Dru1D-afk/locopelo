const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Appointment", {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    master: {
      type: DataTypes.STRING,
      allowNull: false  
    },
    procedure: {
      type: DataTypes.STRING,
      allowNull: false  
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true   
    }
  }, {
    tableName: "appointments",
    timestamps: true
  });
};