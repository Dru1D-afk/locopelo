const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true, unique: true }, 
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
  }, { 
    tableName: "users", 
    timestamps: true 
  });
};