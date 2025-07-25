const Appointment = require("../models/appointment.model")

exports.createAppointment = async(req, res) => {
    try {
        const {userID, serviceID, staffID} = req.body

        const newAppointment = new Appointment({
            user: userID,
            service: serviceID,
            staff: staffID
        });

        const savedAppointment = await newAppointment.save()

        return res.json({
            success: true,
            message: "Appointment created",
            savedAppointment
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message: "Error while creating an appointment"
        })
    }
}

exports.getAllAppointments = async (req, res) => {
    try {
        
    } catch (error) {
        return res.json({
            success: false,
            message: "Error while getting the appointments"
        })
    }
}