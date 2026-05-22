module.exports = (req, res, next) => {
  // Добавляем user во все шаблоны
  res.locals.user = req.session.user || null;
  next();
};