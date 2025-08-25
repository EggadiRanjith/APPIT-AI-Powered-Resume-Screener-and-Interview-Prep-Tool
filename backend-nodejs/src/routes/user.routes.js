const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, verifyToken } = require('../controllers/user.controller');
const auth = require('../middleware/auth');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post('/login', loginUser);

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, getUserProfile);

// @route   GET api/users/verify
// @desc    Verify token and get user data
// @access  Private
router.get('/verify', auth, verifyToken);

module.exports = router;
