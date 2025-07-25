const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    service: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    staff: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true
    },
    status: {
        type:String,
        required: true,
        default: "booked"
    },
}, {timestamps: true})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment