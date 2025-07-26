const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role, phoneNo } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exist",
      });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.json({
          success: false,
          message: "Error while hasing the pass",
        });
      }

      const newUser = new User({
        username,
        email,
        password: hash,
        role,
        phoneNo,
      });

      const savedUser = await newUser.save();
      return res.json({
        success: true,
        savedUser,
        message: "User registered successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while registering the user",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({
        success: false,
        message: "User doesnot exist",
      });
    }

    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (err) {
        return res.json({
          success: false,
          message: "Error while comapiring the password",
        });
      }

      if (!result) {
        return res.json({
          success: false,
          message: "Wrong password",
        });
      }

      const token = jwt.sign(
        {
          _id: existingUser._id,
          usernname: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        maxAge: 86400000,
        secure: true,
        sameSite: "None",
      });

      return res.json({
        success: true,
        message: "Login successful",
        user: {
          _id: existingUser._id,
          usernname: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while logggin in the user",
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: false,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while loggingout user",
    });
  }
};

exports.getloggedInUser = async (req, res) => {
  try {
    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while getting the user",
    });
  }
};
