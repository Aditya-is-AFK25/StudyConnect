const Session = require("../../models/session");

module.exports = async (req,res) => {
    try {
        const existingSession = await Session.findById(req.params.id);

        if (!existingSession) {
            return res.status(404).json({
            message: "Session not found"
            });
        }       
        // only creator can update
        if (existingSession.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to update this session"
            });
        }
                const session = await Session.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true, // returns updated data
                        runValidators: true // checks schema
                    }
                );


        if (!session) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        res.status(200).json({
            message: "Session update successfully",
            session
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};