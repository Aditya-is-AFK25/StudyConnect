const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    description: String,

    file: String,

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    // Optional: tag this note to a specific study group
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Note", noteSchema);