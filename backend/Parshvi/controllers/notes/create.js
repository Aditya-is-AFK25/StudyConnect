const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const { title, subject, description, groupId } = req.body;
        const filePath = req.file ? `/uploads/${req.file.filename}` : "";

        const note = await Note.create({
            title,
            subject,
            description,
            file: filePath,
            uploadedBy: req.user ? req.user._id : null,
            groupId: groupId || null
        });

        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};