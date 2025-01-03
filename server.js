const express = require("express");
const axios = require("axios"); // Axios library for making HTTP requests
const cors = require("cors");

const app = express();
const port = 3000; // Hardcoded port 3000

// Enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(express.json()); // Use express.json() for JSON body parsing

// Handle POST requests to /submit route
app.post("/submit", async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).send("Missing required fields: name, email, age");
  }

  try {
    // Sending data to the external API via GET request
    const response = await axios.get('https://realtime-gray.vercel.app/x_submit', {
      params: {
        name,
        email,
        age
      }
    });

    // Respond back to the client with the result
    res.send("Data transferred successfully.");
  } catch (error) {
    res.status(500).send("Error sending data to external API.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
