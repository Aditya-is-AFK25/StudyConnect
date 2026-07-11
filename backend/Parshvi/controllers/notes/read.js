const Note = require("../../models/note");
const User = require("../../../vignesh/models/User");

module.exports = async (req, res) => {
    try {
        const filter = {};
        if (req.query.subject) {
            filter.subject = req.query.subject;
        } else if (req.params.subject) {
            filter.subject = req.params.subject;
        }
        if (req.query.groupId) {
            filter.groupId = req.query.groupId;
        }

        const notes = await Note.find(filter);
        const result = [];
        
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            let uploader = null;
            
            if (note.uploadedBy) {
                uploader = await User.findById(note.uploadedBy);
            }
            
            result.push({
                _id: note._id,
                title: note.title,
                subject: note.subject,
                description: note.description,
                file: note.file,
                groupId: note.groupId,
                createdAt: note.createdAt,
                uploadedBy: uploader ? { _id: uploader._id, name: uploader.name } : null
            });
        }
        
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};