const { Appointment } = require('../../db'); 

exports.getUserAppointments = async (req, res) => {
  const appointments = await Appointment.findAll({
    where: { userId: req.session.userId },
    order: [['date', 'DESC']]  
  });
  
  res.render("/profile/appointments", { appointments });
};