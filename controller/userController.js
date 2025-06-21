const User = require('../model/userSchema');

// Register a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username: username.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Create user
    const newUser = await User.create({
      username: username.toLowerCase().trim(),
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("CreateUser Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ username: username.toLowerCase().trim() }).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate JWT
    const token = user.generateToken();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
       user: {
    id: user._id,
    username: user.username,
  },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
