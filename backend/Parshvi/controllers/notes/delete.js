const Note = require("../../models/note");
module.exports = async (req, res) => {

    try {

        await Note.findByIdAndDelete(req.params.id);

        res.json({
            message:"Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};