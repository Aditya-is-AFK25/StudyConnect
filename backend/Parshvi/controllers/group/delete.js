const Group = require("../../models/group");

module.exports = async (req,res) => {
    try{
        const group = await Group.deleteMany(req.params.id);

        if(!group) {
            return res.start(404).json({
                message: "Group not found"
            });
        }
        
        res.status(200).json({
            message: "Group deleted successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};