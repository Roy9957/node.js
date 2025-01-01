const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080; // Local port for testing (Vercel overrides this in deployment)

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Array to hold chat messages
let messages = [];

// Endpoint to fetch messages
app.get('/getMessages', (req, res) => {
    res.json({ messages });
});

// Endpoint to send new message
app.post('/sendMessage', (req, res) => {
    const { message } = req.body;
    if (message) {
        messages.push(message); // Store the message
        res.send('Message received');
    } else {
        res.status(400).send('No message provided');
    }
});

// Start the server locally for testing
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export app for Vercel
module.exports = app;
