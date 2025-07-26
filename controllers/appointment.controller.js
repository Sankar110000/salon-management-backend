const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");

exports.createAppointment = async (req, res) => {
  try {
    if(req.user.role == "admin"){
        return res.json({
      success: false,
      message: "Admin cant create an appointment",
    });
    }
    const { serviceID, staffID, date, specialInstructions } = req.body;

    const newAppointment = new Appointment({
      user: req.user._id,
      service: serviceID,
      staff: staffID || null,
    });

    const savedAppointment = await newAppointment.save();

    return res.json({
      success: true,
      message: "Appointment created",
      savedAppointment,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while creating an appointment",
    });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    let allApppointments;
    if (req.user.role === "admin") {
      allApppointments = await Appointment.find()
        .populate("user")
        .populate("service")
        .populate("staff");
    } else {
      allApppointments = await Appointment.find({user: req.user._id}).populate('service').populate('staff')
    }
    return res.json({
      success: true,
      allApppointments,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error while getting the appointments",
    });
  }
};
