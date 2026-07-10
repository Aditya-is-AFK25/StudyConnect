const Session = require("../../models/session");

module.exports = async (req,res) => {
    try {
        const session = await Session.create({
            subject: req.body.subject,
            topic: req.body.topic,
            date: req.body.date,
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