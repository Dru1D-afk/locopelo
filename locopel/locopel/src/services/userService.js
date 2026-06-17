
const { User } = require('../db'); 
const bcrypt = require("bcryptjs");

exports.createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await User.create({
    ...userData,
    password: hashedPassword
  });
};

exports.updateUser = async (userId, userData) => {
  const user = await User.findByPk(userId);
  return await user.update(userData);
};
