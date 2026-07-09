const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const filter = {};
        // Support filtering by subject via query parameters (e.g., ?subject=Math) or fallback path params
        if (req.query.subject) {
            filter.subject = req.query.subject;
        } else if (req.params.subject) {
            filter.subject = req.params.subject;
        }
        
        const notes = await Note.find(filter);
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};