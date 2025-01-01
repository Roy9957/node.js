const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const app = express();
const PORT = 8080;

// Enable CORS
app.use(cors());

// Array to hold chat messages
let messages = [];

// Middleware
app.use(bodyParser.json());

// Endpoint to fetch messages
app.get('/getMessages', (req, res) => {
  res.json({ messages });
});

// Endpoint to send new message
app.post('/sendMessage', (req, res) => {
  const { text, userId } = req.body;
  if (text && userId) {
    messages.push({ text, userId }); // Store the message with userId
    res.status(200).send("Message received");
  } else {
    res.status(400).send("Invalid message");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
