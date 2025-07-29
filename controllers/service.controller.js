const Service = require("../models/service.model")
const Staff = require("../models/staff.model")

exports.createService = async(req, res) => {
    try {
        const {title, description, price, staff, duration} = req.body


        const newService = new Service({
            title,
            description,
            price,
            duration,
            staff,
        })

        const savedService = await newService.save();
        return res.json({
            success: true,
            message: "New Service created",
            savedService
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error while creating the service"
        })
    }
}
exports.deleteService = async(req, res) => {
    try {
        const {id} = req.params
        const deletedService = await Service.findByIdAndDelete(id)
        if(!deletedService){
            return res.json({
                success: false,
                message: "Service not found"
            })
        }
        return res.json({
            success: true,
            message: "Serivce deleted",
            deletedService
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error while creating the service"
        })
    }
}

exports.updateService = async(req, res) => {
    try {
        const {_id, title, description, duration, price, staff} = req.body;
        const updatedService = await Service.findByIdAndUpdate(_id, {
            title,
            description,
            duration,
            price,
            staff
        }, {new: true});

        return res.json({
            success: true,
            message: "Service updated successfully",
            updatedService
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message: "Error while editing the service"
        })
    }
}

exports.getAllService = async (req, res) => {
    try {
        const allServices = await Service.find().populate('staff')
        return res.json({
            success: true,
            allServices
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error while getting the services"
        })
    }
}