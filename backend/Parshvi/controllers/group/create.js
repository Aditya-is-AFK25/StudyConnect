const Group = require("../../models/group");

module.exports = async (req,res) => {
    try {
        const group = await Group.create(req.body);
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};