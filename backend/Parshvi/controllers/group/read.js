const Group = require("../../models/group");

module.exports = async(req,res) => {
    try {
        const filter = {};
        if (req.query.subject) {
            filter.subject = req.query.subject;
        } else if (req.params.subject) {
            filter.subject = req.params.subject;
        }
        const groups = await Group.find(filter);
        
        // Map groups to the format expected by the frontend
        const userId = req.user ? req.user.id : null;
        const mappedGroups = groups.map(g => {
            const membersArray = g.members || [];
            return {
                id: g._id,
                _id: g._id,
                name: g.groupName,
                course: g.subject,
                desc: g.description,
                members: membersArray.length,
                joined: userId ? membersArray.some(m => m.toString() === userId.toString()) : false
            };
        });
        
        res.status(200).json(mappedGroups);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};