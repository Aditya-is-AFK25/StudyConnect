const Progress = require("../../models/progress");

module.exports = async (req,res) => {
    try {
        const progress = await Progress.create({
            user: req.user.id,
            subject: req.body.subject,
            topic: req.body.topic,
            status: req.body.status
        });

        res.status(201).json({
            message: "Progress added successfully",
            progress
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};