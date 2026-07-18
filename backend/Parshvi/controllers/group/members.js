const Group = require("../../models/group");

module.exports = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate("members", "name email");
        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }
        
        const members = group.members.map(member => ({
            id: member._id,
            name: member.name,
            email: member.email,
            isAdmin: group.createdBy && member._id.toString() === group.createdBy.toString()
        }));

        res.status(200).json(members);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
