const Note = require("../../models/note"); 

module.exports = async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};