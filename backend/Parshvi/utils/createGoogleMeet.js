const { google } = require("googleapis");
const oauth2Client = require("./googleauth");

const createGoogleMeet = async (subject, topic, date, time) => {

// creates a connection to google cal API
    const calendar = google.calendar({
        version: "v3",
        auth: oauth2Client
    });

    const startDateTime = new Date(`${date}T${time}`);

    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1); // every session is an hour long

    const event = {
        summary: `${subject} Study Session`,
        description: `Topic: ${topic}`,

        start: {
            dateTime: startDateTime.toISOString(),
            timeZone: "Asia/Kolkata"
        },

        end: {
            dateTime: endDateTime.toISOString(),
            timeZone: "Asia/Kolkata"
        },

        //Creates a new unique Google Meet conference for every Calendar event.
        conferenceData: {
            createRequest: {
                requestId: `studyconnect-${Date.now()}`,
                conferenceSolutionKey: {
                    type: "hangoutsMeet"
                }
            }
        }
    };

    const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1
    });

    const meetingLink =
        response.data.conferenceData?.entryPoints?.find(
            (entry) => entry.entryPointType === "video"
        )?.uri;

    return {
        meetingLink: meetingLink,
        eventId: response.data.id
    };
};

module.exports = createGoogleMeet;