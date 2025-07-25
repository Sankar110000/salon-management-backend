const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    appointments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
    }],
    services: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Service",
    }],

})

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin