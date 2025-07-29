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
    const { serviceID, staffID, date, specialInstructions, time } = req.body;

    const newAppointment = new Appointment({
      user: req.user._id,
      service: serviceID,
      staff: staffID || null,
      date,
      time
    });

    const savedAppointment = await newAppointment.save();

    const updatedUser = await User.findByIdAndUpdate(req.user._id, {$push: {appointments: savedAppointment}}, {new: true})

    return res.json({
      success: true,
      message: "Appointment created",
      savedAppointment,
      updatedUser
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

exports.getUserAppointments = async(req, res) => {
  try {
    const loggedInUser = req.user;
    const user = await User.findById(loggedInUser._id).populate({path:'appointments', populate: {path: ["service", "staff", "user"]}})
    if(!user){
      return res.json({
        success:false,
        message: "User not found"
      })
    }
    return res.json({
      success:true,
      appointments: user.appointments
    })
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "Error while getting user appointments"
    })
  }
}

exports.cancelAppointment = async(req, res) => {
  try {
    const {appointmentID} = req.body;
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentID)
    await User.findByIdAndUpdate(req.user?._id, {$pull: {appointments: deletedAppointment._id}})
    return res.json({
      success:false,
      message: "Booking canceled"
    })
  } catch (error) {
    console.log(error)
    return res.send({
      success: false,
      message: "ErError while canceling an appointment"
    })
  }
} 

exports.changeAppointmentStatus = async(req, res) => {
  try {
    const {appointmentID, status} = req.body;
    await Appointment.findByIdAndUpdate(appointmentID, {status})
    return res.json({
      success: true,
      message: "Status changed successfully"
    })
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "Error while changing the status"
    })
  }
}