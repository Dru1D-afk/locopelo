const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const userController = require('../controllers/admin/userController');

router.get("/", adminMiddleware, (req, res) => {
  res.render("admin/dashboard");
});

const { listUsers, deleteUser, makeAdmin, deleteAdmin, getUsers, viewUserProfile } = require("../controllers/admin/userController");
router.get("/users", adminMiddleware, listUsers);
router.post("/users/delete/:id", adminMiddleware, deleteUser);
router.post("/users/make-admin/:id", adminMiddleware, makeAdmin);
router.post("/users/delete-admin/:id", adminMiddleware, deleteAdmin);
router.get("/users/getusers", adminMiddleware, getUsers);


const appointmentController = require("../controllers/admin/appointmentController");
router.get("/appointment-add", adminMiddleware, appointmentController.addAppointmentForm);
router.post("/appointment-add", adminMiddleware, appointmentController.addAppointment);


const bookingController = require('../controllers/admin/bookingController');
router.get('/bookings', authMiddleware, bookingController.getBookings);
router.post('/bookings/:id/status', authMiddleware, bookingController.updateStatus);
router.post('/bookings/:id/meetingDate', authMiddleware, bookingController.updateDate);
router.post('/bookings/:id/procedure', authMiddleware, bookingController.updateProcedure);
router.post('/bookings/:id/delete', authMiddleware, bookingController.deleteBooking);


const productController = require("../controllers/admin/productController");
router.get("/products", authMiddleware, adminMiddleware, productController.getProductsPage);
router.post("/products/add", authMiddleware, adminMiddleware, upload.single('image'), productController.addProduct);
router.get("/products/edit/:id", authMiddleware, adminMiddleware, productController.getEditPage);
router.post("/products/edit/:id", authMiddleware, adminMiddleware, upload.single('image'), productController.updateProduct);
router.post("/products/delete/:id", authMiddleware, adminMiddleware, productController.deleteProduct);


// заход в профил
router.get('/users/profile/:id', authMiddleware, adminMiddleware, viewUserProfile);


module.exports = router;