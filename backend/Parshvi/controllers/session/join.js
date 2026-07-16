const Session = require("../../models/session");

module.exports = async (req, res) => {
    try {

        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        const userId = req.user.id;
        const status = req.body.status;

        // Validate status
        if (status !== "attending" && status !== "declined") {
            return res.status(400).json({
                message: "Status must be either 'attending' or 'declined'"
            });
        }

        const isJoined = session.participants.some(
            participant => participant.toString() === userId.toString()
        );

        if (status === "attending") {

            if (!isJoined) {
                session.participants.push(userId);
            }

        } else {

            session.participants = session.participants.filter(
                participant => participant.toString() !== userId.toString()
            );

        }

        await session.save();

        res.status(200).json({
            message:
                status === "attending"
                    ? "You have joined the session"
                    : "You have declined the session",
            session
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};