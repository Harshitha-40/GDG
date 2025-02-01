const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
const PORT = 3000;

// Twilio credentials
const accountSid = "ACd16d8a659c0078e06e6b992e134c6a67";
const authToken = "90e2c6836a6d31a25b63310fc91e7f84";
const twilioPhoneNumber = "+15076292034";

const client = new twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

// API route to send SMS
app.post("/send-sms", (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).send("Missing phone number or message.");
    }

    client.messages.create({
        body: message,
        to: phone,
        from: twilioPhoneNumber,
    })
    .then((message) => res.status(200).send(`SMS sent: ${message.sid}`))
    .catch((error) => res.status(500).send(error));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
