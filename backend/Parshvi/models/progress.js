const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    subject: { 
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending","In Progress", "Completed"],
        default: "Pending"
    }

});

module.exports = mongoose.model("Progress", progressSchema);