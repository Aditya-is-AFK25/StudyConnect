const express = require("express");
const router = express.Router();

const oauth2Client = require("../utils/googleauth");

router.get("/auth", (req, res) => {

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/calendar"
        ],
        include_granted_scopes: true
    });

    res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
    try {
        const code = req.query.code;

        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        res.redirect("https://meet.google.com");

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;