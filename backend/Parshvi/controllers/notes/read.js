const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const notes = await Note.find({
            subject: req.params.subject
        });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};