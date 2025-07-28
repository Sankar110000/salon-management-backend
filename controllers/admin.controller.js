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