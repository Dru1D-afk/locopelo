const { User, Appointment, Booking, Op } = require('../../db'); 


exports.listUsers = async (req, res) => {
  const searchQuery = req.query.search;
  const users = await User.findAll({
    attributes: { exclude: ['password'] }
  });
  res.render("admin/users", { users, currentUserId: req.session.userId, searchQuery  });
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (userId == req.session.userId) {
    return res.redirect("/admin/users");
  }
  await User.destroy({ where: { id: userId } });
  res.redirect("/admin/users");
};

exports.makeAdmin = async (req, res) => {
  const userId = req.params.id;
  await User.update({ role: "admin" }, { where: { id: userId } });
  res.redirect("/admin/users");
};

exports.deleteAdmin = async (req, res) => {
  const userId = req.params.id;
  await User.update({ role: "user" }, { where: { id: userId } });
  res.redirect("/admin/users");
};


exports.getUsers = async (req, res) => {
  const searchQuery = req.query.search;
  let whereClause = {};
  if (searchQuery) {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { email: { [Op.like]: `%${searchQuery}%` } },
        { role: { [Op.like]: `%${searchQuery}%` } }
      ]
    };
  }
  const users = await User.findAll({ where: whereClause });
  res.render('admin/users', { users, searchQuery, currentUserId: req.session.userId, });
};


exports.viewUserProfile = async (req, res) => {
  
  // Ищем пользователя по ID + все его записи
  const user = await User.findByPk(req.params.id, {
    include: [Appointment, Booking] // Подгружаем связанные данные
  });

  if (!user) return res.status(404).send('Пользователь не найден');

  res.render('admin/user-profile', { user });
};