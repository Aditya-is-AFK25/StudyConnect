const Session = require("../../models/session");
const createGoogleMeet = require("../../utils/createGoogleMeet");

module.exports = async (req, res) => {
    try {

        const { subject, topic, location, date, time } = req.body;

        if (!subject || !topic || !date || !time) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
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