const { Booking } = require('../../db'); 

exports.getBookings = async (req, res) => {
  const bookings = await Booking.findAll({ order: [['createdAt', 'DESC']] });
  res.render('admin/bookings', { bookings });
};

exports.updateStatus = async (req, res) => {
  await Booking.update({ status: req.body.status }, { where: { id: req.params.id } });
  res.redirect('/admin/bookings');
};

exports.updateDate = async (req, res) => {
  await Booking.update({ meetingDate: req.body.meetingDate }, { where: { id: req.params.id } });
  res.redirect('/admin/bookings');
};

exports.updateProcedure = async (req, res) => {
  await Booking.update({ procedure: req.body.procedure }, { where: { id: req.params.id } });
  res.redirect('/admin/bookings');
};

exports.deleteBooking = async (req, res) => {
  await Booking.destroy({ where: { id: req.params.id } });
  res.redirect('/admin/bookings');
};
