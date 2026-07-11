const Group = require("../../models/group");

module.exports = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate("members", "name email");
        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }
        
        // Return populated list of member names/emails
        res.status(200).json(group.members);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
