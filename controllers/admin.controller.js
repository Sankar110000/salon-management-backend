const Appointment = require("../models/appointment.model")
const Service = require("../models/service.model")
const Staff = require("../models/staff.model")
const User = require("../models/user.model")

exports.getAllUsers = async(req, res) => {
    try {
        const allUsers = await User.find({role: "user"}).select("-password")
        res.json({
            success: true,
            allUsers
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error while fetching all the users"
        })
    }
}

exports.getAnalytics = async(req, res) => {
    try {
        const appointmentCount = await Appointment.countDocuments();
        const serviceCount = await Service.countDocuments()
        const staffCount = await Staff.countDocuments()

        return res.json({
            success: true,
            appointmentCount,
            serviceCount,
            staffCount,
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error while getting analytics"
        })
    }
}