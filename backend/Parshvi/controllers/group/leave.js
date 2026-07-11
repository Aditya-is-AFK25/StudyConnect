const Group = require("../../models/group");

module.exports = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }
        const userId = req.user.id;

        // check if member
        const memberIndex = group.members.findIndex(memberId => memberId.toString() === userId.toString());
        if (memberIndex === -1) {
            return res.status(400).json({
                message: "You are not a member of this group!"
            });
        }
        group.members.splice(memberIndex, 1);
        await group.save();

        res.status(200).json({
            message: "Left group successfully",
            group
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
