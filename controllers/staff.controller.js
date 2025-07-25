const Staff = require("../models/Staff.model")

exports.addStaff = async(req, res) => {
    try {
        const {name, email, image, role} = req.body
        const existingStaff = await Staff.findOne({email})
        if(existingStaff){
            return res.json({
                success: false,
                message: "Staff already exist"
            })
        }

        const newStaff = new Staff({
            name,
            email,
            image,
            role
        })

        const savedStaff = await newStaff.save()

        return res.json({
            success: true,
            message: "Staff added",
            savedStaff
        })

    } catch (error) {
        return res.json({
            success: false,
            message: "Error whle adding the staff"
        })
    }
}