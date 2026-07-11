const Progress = require("../../models/progress");

module.exports = async (req, res) => {
    try{
        const progress = await Progress.findByIdAndDelete(req.params.id);
        
        if (!progress) {
            return res.status(404).json({
                message: "Progress not found"
            });
        }
        res.status(200).json({
            message: "Progress deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};