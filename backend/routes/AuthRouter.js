const { signupValidation } = require("../Middlewares/AuthValidation");
const { signup } = require("../controllers/AuthController"); // No need for `.default`

const router = require("express").Router(); // Invoke the Router method

// Route for login
router.post("/login", (req, res) => {
  res.send("login success");
});

// Route for signup
router.post("/signup", signupValidation, signup); // Apply validation middleware before calling signup

module.exports = router; // Export the router for use in other files
