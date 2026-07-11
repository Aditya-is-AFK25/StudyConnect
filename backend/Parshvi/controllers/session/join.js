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
        const status = req.body.status; // "attending" or "declined"
        
        const isJoined = session.participants.some(p => p.toString() === userId.toString());

        if (status === "attending") {
            if (!isJoined) {
                session.participants.push(userId);
                await session.save();
            }
        } else if (status === "declined") {
            if (isJoined) {
                session.participants = session.participants.filter(p => p.toString() !== userId.toString());
                await session.save();
            }
        } else {
            // Toggle fallback
            if (isJoined) {
                session.participants = session.participants.filter(p => p.toString() !== userId.toString());
            } else {
                session.participants.push(userId);
            }
            await session.save();
        }

        res.status(200).json({
            message: "RSVP updated successfully",
            session
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};