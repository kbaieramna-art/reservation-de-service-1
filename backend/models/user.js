const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    speciality: String,
    location: String,
    role: String,
    status: String,
    img: String,
    serviceids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
    }],
    reservationids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
    }],
})
const user = mongoose.model("User", userSchema);

module.exports = user;