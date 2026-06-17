module.exports = (req, res, next) => {
  if (!req.session.userId) {
    console.log("Нет сессии, редирект на /auth/login");
    return res.redirect("/auth/login");
  }
  console.log("Доступ разрешён:", req.session.user?.name, req.session.user?.phone);
  next();
};