const Session = require("../../models/session");

module.exports = async (req,res) => {
    try {
        const filter = {};
        if (req.query.subject) {
            filter.subject = req.query.subject;
        } else if (req.params.subject) {
            filter.subject = req.params.subject;
        }
        const sessions = await Session.find(filter);

        const userId = req.user ? req.user.id : null;
        const mappedSessions = sessions.map(s => {
            const participantsArray = s.participants || [];
            const isAttending = userId ? participantsArray.some(p => p.toString() === userId.toString()) : false;
            return {
                id: s._id,
                _id: s._id,
                date: s.date ? new Date(s.date).toISOString().split('T')[0] : "",
                time: s.time || "",
                location: s.location || "Online",
                goal: s.topic || "Study Session",
                status: isAttending ? "attending" : "declined"
            };
        });

        res.status(200).json(mappedSessions);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};