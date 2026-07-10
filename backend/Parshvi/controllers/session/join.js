const Session = require("../../models/session");

module.exports = async (req,res) => {
    try {
        const session = await Session.findById(req.params.id);

        if(!session) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        const userId = req.user.id;
        if (session.participants.includes(userId)) {
            return res.status(400).json({
                message: "You have already joined this session!"
            });
        }

        session.participants.push(userId);
        await session.save();

        res.status(200).json({
            message: "Joined successfully",
            session
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};