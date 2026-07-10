const Group = require ("../../models/group");
module.exports = async(req,res) => {
    try{
        const groups = await Group.find({
            subject: req.params.subject // subject based 
        });
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};