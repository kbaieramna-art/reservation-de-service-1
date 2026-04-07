const mongoose = require("mongoose");

const serviceschema = mongoose.Schema({
    name: String,
    discription: String,
    price: Number,
    prestataireemail: String,
    serviceimg: String,
    prestataireid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }
});

const service = mongoose.model("Service", serviceschema);

module.exports = service;