// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, username } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    // Check if user already exists by email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Check if user already exists by username
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      username // Ensure username is included
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: newUser._id 
    });
  } catch (error) {
    console.error('Registration Error:', error); // Log error for debugging
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      userId: user._id,
      role: user.role
    });
  } catch (error) {
    console.error('Login Error:', error); // Log error for debugging
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // Fetch user profile excluding password
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile Fetch Error:', error); // Log error for debugging
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
