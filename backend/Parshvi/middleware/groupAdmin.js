const StudyGroup = require("../models/studyGroup");

module.exports = async (req, res, next) => {
    const group = await StudyGroup.findById(req.params.groupId);

    if(!group)
        return res.status(404).json({
    message: "Group not found",
        });

    if (group.admin.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Only admin can perform this action",
        });
    }

    req.group = group;
    next();
};