const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({

    title: String,

    subject: String,

    date: Date,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

});

module.exports = mongoose.model("Session", sessionSchema);