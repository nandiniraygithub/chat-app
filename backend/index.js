const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter'); // Import the auth router

require('dotenv').config();
require('./Models/db'); // Import the database connection

const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use the auth routes
app.use('/auth', AuthRouter); // Mount the router on /auth path

// Ping route
app.get('/ping', (req, res) => {
   res.send('pong');
});



// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on ${PORT}`);
});
