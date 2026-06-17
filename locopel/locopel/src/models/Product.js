const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imageUrl: {
  type: DataTypes.STRING,
  allowNull: true
}
}, {
  tableName: "products",
  timestamps: true
});
};

