const Progress = require("../../models/progress");

module.exports = async (req,res) => {
    try {
        const progress = await Progress.update(
            req.params.id,
            req.body,
            {
                new: true, // return updated
                runValidators: true
            }
        );
        if (!progress) {
            return res.status(404).json({
                message: "Progress not found"
            });
        }
        res.status(200).json({
            message: "Progress updated successfully",
            progress
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};