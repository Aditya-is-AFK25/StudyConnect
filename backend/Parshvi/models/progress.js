const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    subject: String,

    completedTopics: Number,

    totalTopics: Number

});

module.exports = mongoose.model("Progress", progressSchema);