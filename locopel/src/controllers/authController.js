const bcrypt = require("bcryptjs");
const userService = require("../services/userService");
const { User } = require('../db'); 

exports.getRegisterForm = (req, res) => {
  res.render("registration");
};

exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const user = await userService.createUser({
      name, email, password, phone
    });
    res.redirect("/auth/login");
  } catch (err) {
    res.status(500).send("Ошибка регистрации");
  }
};

exports.getLoginForm = (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ where: { phone } });

  if (!user) {
    return res.status(401).send("Пользователь не найден" );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send("Неверный пароль");
  }

  req.session.userId = user.id;
  req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role
    };

  res.redirect("/profile");
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
