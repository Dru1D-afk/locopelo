const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: "./src/db/database.sqlite",
  logging: false
});

// инициализация моделей, передавая sequelize
const Favorite = require('../models/Favorite')(sequelize);
const User = require('../models/User')(sequelize);
const Appointment = require('../models/Appointment')(sequelize);
const Booking = require('../models/Booking')(sequelize);
const Product = require('../models/Product')(sequelize);

User.hasMany(Appointment);
Appointment.belongsTo(User);
User.hasMany(Booking);
Booking.belongsTo(User);

User.belongsToMany(Product, { through: Favorite, as: 'favorites' });
Product.belongsToMany(User, { through: Favorite, as: 'favoritedBy' });

module.exports = { sequelize, DataTypes, Op, User, Appointment, Booking, Product, Favorite };

