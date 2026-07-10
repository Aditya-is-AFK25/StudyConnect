const Session = require("../../models/session");

module.exports = async (req,res) => {
    try {
        const sessions = await Session.find({
            subject: req.params.subject //read sessions by subject 
        });

        if (sessions.length == 0) {
            return res.status(404).json({
                message: "No sessions found"
            });
        }
        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};