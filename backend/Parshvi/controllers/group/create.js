const Group = require("../../models/group");

module.exports = async (req, res) => {
    try {
        const groupData = {
            groupName: req.body.groupName,
            subject: req.body.subject,
            description: req.body.description,
            createdBy: req.user ? req.user.id : null,
            members: req.user ? [req.user.id] : []
        };
        const group = await Group.create(groupData);
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};