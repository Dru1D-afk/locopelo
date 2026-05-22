
const { User, Product, Appointment, Booking } = require('../db'); 

exports.getProfile = async (req, res) => {
  const sessionUser = req.session.user; 
  if (!sessionUser) return res.redirect("/auth/login");

  const user = await User.findByPk(sessionUser.id, {
    include: [{ model: Product, as: 'favorites' }] 
  });

  const appointments = await Appointment.findAll({
    where: { userId: sessionUser.id },
    order: [['date', 'DESC']]
  });

    const bookings = await Booking.findAll({
      where: { userId: sessionUser.id },
      order: [['createdAt', 'DESC']]
    });


  res.render("profile", { 
    user,
    appointments,
    currentUserId: sessionUser.id,
    favorites: user.favorites,
    bookings
  });
};
