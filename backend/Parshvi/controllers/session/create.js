const Session = require("../../models/session");

module.exports = async (req,res) => {
    try {
        const session = await Session.create({
            subject: req.body.subject || "General",
            topic: req.body.topic || req.body.goal || "Study Session",
            location: req.body.location || "Online",
            date: req.body.date,
            time: req.body.time,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Session created successfully",
            session 
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};