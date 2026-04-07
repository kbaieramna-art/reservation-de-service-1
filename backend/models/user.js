// Import modules
// Import mongoose module
const mongoose = require("mongoose");
// Create user schema
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
    resezrvationids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
    }],
})
// Affect user name to user schema
const user = mongoose.model("User", userSchema);

// Make user exportable
module.exports = user;