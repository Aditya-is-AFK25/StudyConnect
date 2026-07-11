const Message = require("../../models/Message");
const Group = require("../../models/group");

module.exports = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        const message = await Message.create({
            group: req.params.id,
            user: req.user.id,
            text: req.body.text
        });

        await message.populate("user", "name");

        res.status(201).json({
            id: message._id,
            _id: message._id,
            text: message.text,
            userName: message.user ? message.user.name : "Unknown",
            timestamp: message.timestamp
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
