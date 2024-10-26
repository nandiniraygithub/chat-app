const mongoose = require('mongoose');

// MongoDB connection string (using MongoDB Atlas or any environment variable)
const mongoURl = process.env.MONGO_CONN; // No quotes here

// Local MongoDB connection string (if you're running MongoDB locally)
// const mongoURI = 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB
mongoose.connect(mongoURl) // No need for useNewUrlParser or useUnifiedTopology
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));
