const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const profileController = require("../controllers/profileController");

router.get("/", authMiddleware, profileController.getProfile);

// 
const appointmentController = require("../controllers/profile/appointmentController");
router.get("/appointments", authMiddleware, appointmentController.getUserAppointments);

module.exports = router;
