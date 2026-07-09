const Group = require("../../models/group");

module.exports = async (req,res) => {
    try {
        const group = await Group.findById(req.params.id);
        if(!group){
            return res.status(404).json({
                message: "Group not found"
            });
        }
        // get logged in ID from auth middleware
        const userId = req.user.id;

        // prevent duplicate members
        if (group.members.includes(userId)){
            return res.status(400).json({
                message: "You have already joined this group!"
            });
        }
        group.members.push(userId);
        await group.save();

        res.status(200).json({
            message: "Joined successfully",
            group
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};