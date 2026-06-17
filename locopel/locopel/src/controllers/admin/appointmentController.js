const { User, Appointment } = require('../../db'); 

exports.addAppointmentForm = async (req, res) => {
  const users = await User.findAll();
  res.render("admin/appointment-add", { users });
};

exports.addAppointment = async (req, res) => {
  try {
    console.log("Форма:", req.body);
    
    // проверяем req.body
    if (!req.body || !req.body.userId) {
      return res.status(400).send("Ошибка: выберите пользователя");
    }
    
    await Appointment.create({
      UserId: req.body.userId,
      date: req.body.date,
      master: req.body.master,
      procedure: req.body.procedure,
      notes: req.body.notes || ""
    });
    
    console.log("✅ Запись добавлена для userId:", req.body.userId);
    res.redirect("/admin");
  } catch (error) {
    console.error("❌ Ошибка добавления записи:", error);
    res.status(500).send("Ошибка сервера: " + error.message);
  }
};