const { Booking } = require('../db'); 
const axios = require('axios');

const TOKEN = '8218146829:AAFRtT_uGITpot1bjxXXhX0cTn-uUXPt6I8';
const CHAT_ID = '-1003747605673';

exports.createBooking = async (req, res) => {
  await Booking.create({
    UserId: req.session.user ? req.session.user.id : null,
    city: req.body.city,
    name: req.body.name,
    phone: req.body.phone
  });
  res.redirect("/");
  console.log('✅ Запись создана! ');


  let message = `
  🔔 Новая запись! 
  📍 Город: ${ req.body.city}
  👤 Имя: ${ req.body.name}
  📞 Телефон: ${ req.body.phone}
    `;
  
    try {
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });
      console.log("форма в tg отправлена");
    } catch (error) {
      console.error("Ошибка отправки в Telegram:", error);
    }
};

exports.bookingCancellation = async (req, res) => {
const sessionUser = req.session.user; 
  let message = `
  ❗Запрос на отмену записи  №${ req.body.bookingid}
  👤 Имя: ${ req.session.user.name}
  📞 Телефон: ${ req.session.user.phone}
    `;
  
    try {
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });
      console.log("форма в tg отправлена");
    } catch (error) {
      console.error("Ошибка отправки в Telegram:", error);
    }
    res.redirect("/profile");
};

exports.createBookingAdmin = async (req, res) => {
  await Booking.create({
    UserId: req.session.user ? req.session.user.id : null,
    city: req.body.city,
    name: req.body.name,
    phone: req.body.phone
  });
  res.redirect("/admin/bookings");
  console.log('✅ Запись создана! ');
};