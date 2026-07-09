const Note = require("../../models/note");

module.exports = async (req, res) => {

    try {

        const note = await Note.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }

        );

        res.json(note);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};