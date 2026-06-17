const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const bookingController = require("../controllers/bookingController");
const favoriteController = require('../controllers/favoriteController'); 

router.get("/", mainController.home);
router.get("/extensions", mainController.extensions);
router.get("/education", mainController.education);
router.get("/products", mainController.products);

router.post('/favorites/toggle', favoriteController.toggleFavorite);

router.post('/bookings', bookingController.createBooking);
router.post('/bookingsadmin', bookingController.createBookingAdmin);
router.post('/booking/cancellation', bookingController.bookingCancellation);


module.exports = router;
