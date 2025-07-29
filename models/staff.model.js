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
        default: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
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