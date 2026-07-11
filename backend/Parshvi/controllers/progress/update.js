const Progress = require("../../models/progress");

module.exports = async (req,res) => {
    try {
        const updateData = {};
        if (req.body.done !== undefined) {
            updateData.status = req.body.done ? "Completed" : "Pending";
        } else {
            Object.assign(updateData, req.body);
        }

        const progress = await Progress.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
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
            progress: {
                id: progress._id,
                _id: progress._id,
                category: progress.subject,
                text: progress.topic,
                done: progress.status === "Completed"
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};