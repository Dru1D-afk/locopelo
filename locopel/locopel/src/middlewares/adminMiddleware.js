module.exports = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).send("Доступ только для админов");
  }
  next();
};
