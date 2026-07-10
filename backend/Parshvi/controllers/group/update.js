const Group = require("../../models/group");

module.exports = async (req,res) => {
    try {
        const group = await Group.update(
            req.params.id, // find by id
            req.body,
            {
                new: true, // return new doc
                runValidators: true 
            }
        );

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        res.status(200).json({
            message: "Group updated successfully",
            group
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};