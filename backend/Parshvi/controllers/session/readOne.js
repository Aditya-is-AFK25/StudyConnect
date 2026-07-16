// fetch one session using unique MongoDB id
const Session = require("../../models/session");

module.exports = async (req, res) => {

    try {

        // Find session using its MongoDB ID
        const session = await Session.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("participants", "name email");

        // Check whether session exists
        if (!session) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        // Return the session
        res.status(200).json(session);

    }
    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};