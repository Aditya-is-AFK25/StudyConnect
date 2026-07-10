const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("Session", sessionSchema);