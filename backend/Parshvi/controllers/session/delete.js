const Session = require("../../models/session");

module.exports = async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);

        if (!session) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        res.status(200).json({
            message: "Session deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};