const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    subject: {
        type: String,
        default: "General"
    },
    topic: {
        type: String,
        default: "Study Session"
    },
    location: {
        type: String,
        default: "Online"
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    meetingLink: {
        type: String
    },
    googleEventId: {
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