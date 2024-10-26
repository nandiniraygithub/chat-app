const bcrypt = require('bcryptjs'); // For password hashing
const userModel = require('../Models/user'); // Assuming your user model is in 'models/User'

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists, you can login.',
        success: false
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response after registration
    res.status(201).json({
      message: 'User registered successfully!',
      success: true
    });
  } catch (err) {
    // Handle errors
    res.status(500).json({
      error: 'Server error, please try again later.'
    });
  }
};

module.exports = {
  signup
};
