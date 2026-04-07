const express = require("express");
const {
  authenticateJWT,
  checkRole,
} = require("../../../Middleware/authMiddleware");
const {
  addDoctor,
  getProfile,
  getAppointments,
} = require("../../../Controllers/doctorController");
const {
  doctorUpdateAppointmentStatus,
} = require("../../../Controllers/appointmentController");
const {
  getNotifications,
  markNotificationAsRead,
} = require("../../../Controllers/notificationController");
const {
  addPrescription,
  getDoctorPrescriptions,
} = require("../../../Controllers/prescriptionController");
const router = express.Router();

router.post("/addDoc", authenticateJWT, checkRole("isAdmin"), addDoctor);
router.get("/profile", authenticateJWT, checkRole("isDoctor"), getProfile);
router.get(
  "/allNotifications",
  authenticateJWT,
  checkRole("isDoctor"),
  getNotifications
);
router.get(
  "/read/:id",
  authenticateJWT,
  checkRole("isDoctor"),
  markNotificationAsRead
);
router.post(
  "/addPrescription/:id",
  authenticateJWT,
  checkRole("isDoctor"),
  addPrescription
);
router.get(
  "/getAppointments",
  authenticateJWT,
  checkRole("isDoctor"),
  getAppointments
);

router.get(
  "/getDoctorPrescriptions",
  authenticateJWT,
  checkRole("isDoctor"),
  getDoctorPrescriptions
);

router.post(
  "/updateAppointmentStatus",
  authenticateJWT,
  checkRole("isDoctor"),
  doctorUpdateAppointmentStatus
);

module.exports = router;
