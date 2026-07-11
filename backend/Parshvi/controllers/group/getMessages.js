const Message = require("../../models/Message");

module.exports = async (req, res) => {
    try {
        const messages = await Message.find({ group: req.params.id })
            .populate("user", "name")
            .sort({ timestamp: 1 }); // Oldest first for chronologic scroll

        const mapped = messages.map(m => ({
            id: m._id,
            _id: m._id,
            text: m.text,
            userName: m.user ? m.user.name : "Unknown",
            timestamp: m.timestamp
        }));

        res.status(200).json(mapped);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
