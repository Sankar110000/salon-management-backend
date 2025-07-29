const Staff = require("../models/staff.model");

exports.addStaff = async (req, res) => {
  try {
    const { name, email, image, role, phone } = req.body;
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.json({
        success: false,
        message: "Staff already exist",
      });
    }

    const newStaff = new Staff({
      name,
      email,
      image,
      role,
      phone
    });

    const savedStaff = await newStaff.save();

    return res.json({
      success: true,
      message: "Staff added",
      savedStaff,
    });
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "Error whle adding the staff",
    });
  }
};

exports.getAllStaffs = async (req, res) => {
  try {
    const allStaffs = await Staff.find();
    return res.json({
      success: true,
      allStaffs,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error while getting the staffs",
    });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const { staffID } = req.body;
    await Staff.findByIdAndDelete(staffID);
    return res.json({
      message: "Staff deleted successfully",
      success: false,
    });
    re;
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while deleting staff",
    });
  }
};
