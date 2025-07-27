const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
    },
    duration:{
        type:Number,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    staff: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Staff",
    },
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service