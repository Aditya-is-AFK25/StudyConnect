const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudyGroup",
        required: true
    },
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
    // A session belongs to one study group. This lets the chat show only its
    // own announcements and lets us verify the group's admin on creation.
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    participants: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    }
});

module.exports = mongoose.model("Session", sessionSchema);
