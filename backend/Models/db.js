const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const mongoURL = process.env.MONGO_CONN;

mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Connection error:', err));
