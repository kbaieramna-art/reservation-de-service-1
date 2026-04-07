const mongoose = require("mongoose");
const reservationschema = mongoose.Schema(
    {
        fullname: String,
        email: String,
        phone: Number,
        service: String,
        date: Date,
        time: String,
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        serviceid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Services",
        },
    });
const reservation = mongoose.model("Reservation", reservationschema);
module.exports = reservation;