const Progress = require("../../models/progress");

module.exports = async (req,res) => {
    try {
        const progress = await Progress.find({
            user: req.user.id // can only see their progress
        });
        res.status(200).json(progress);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};