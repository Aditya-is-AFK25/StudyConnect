const Session = require("../../models/session");
const Group = require("../../models/group");
const createGoogleMeet = require("../../utils/createGoogleMeet");

module.exports = async (req, res) => {
    try {
<<<<<<< HEAD
        // Group sessions can only be scheduled by the user who created the
        // group. This check is intentionally on the server, not only in UI.
        if (req.body.groupId) {
            const group = await Group.findById(req.body.groupId);
            if (!group) {
                return res.status(404).json({ message: "Study group not found" });
            }
            if (!group.createdBy || group.createdBy.toString() !== req.user.id.toString()) {
                return res.status(403).json({ message: "Only the group admin can create a session" });
            }
=======

        const { subject, topic, location, date, time } = req.body;

        if (!subject || !topic || !date || !time) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
>>>>>>> 5baa4dd1b8bf392be5405b2fbb0b680e96642d6e
        }

        const googleMeet = await createGoogleMeet(
            subject,
            topic,
            date,
            time
        );

        const session = await Session.create({
            subject,
            topic,
            location,
            date,
            time,
            meetingLink: googleMeet.meetingLink,
            googleEventId: googleMeet.eventId,
            groupId: req.body.groupId || null,
            createdBy: req.user.id,
            participants: []
        });

        res.status(201).json({
            message: "Session and Google Meet created successfully",
            session
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
