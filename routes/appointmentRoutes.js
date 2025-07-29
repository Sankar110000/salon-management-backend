const {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  cancelAppointment,
  changeAppointmentStatus,
} = require("../controllers/appointment.controller");
const { authorize } = require("../middlewares/authorization");
const { verifyJWT } = require("../middlewares/verifyJWT");

const appointmentRouter = require("express").Router();

appointmentRouter.post("/create", verifyJWT, createAppointment);
appointmentRouter.post(
  "/getAllAppointments",
  verifyJWT,
  authorize,
  getAllAppointments
);
appointmentRouter.get("/getUserAppointments", verifyJWT, getUserAppointments);
appointmentRouter.delete("/cancelAppointment", cancelAppointment);
appointmentRouter.post("/changeStatus",verifyJWT, authorize, changeAppointmentStatus);

module.exports = appointmentRouter;
