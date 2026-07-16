const Session = require("../../models/session");
const createGoogleMeet = require("../../utils/createGoogleMeet");

module.exports = async (req, res) => {
    try {
        const googleMeet = await createGoogleMeet(
            req.body.subject,
            req.body.topic,
            req.body.date,
            req.body.time
        );

        const session = await Session.create({
            subject: req.body.subject,
            topic: req.body.topic,
            location: req.body.location,
            date: req.body.date,
            time: req.body.time,
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