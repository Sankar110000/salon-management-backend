const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type:Number,
    required:true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required:true
  },
  bookingHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
