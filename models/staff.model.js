const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email: {
        type:String,
        required: true
    },
    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type:String,
        default: "staff",
        required:true
    }
})

const Staff = mongoose.model("Staff", staffSchema)

module.exports = Staff