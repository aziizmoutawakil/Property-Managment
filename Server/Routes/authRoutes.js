const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const jwtMiddleware = require('../Middleware/authMiddleware')

// User-related routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.post('/logout', (req, res) => {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict',
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  });

router.get('/me', UserController.getMe);

// New profile route with JWT authentication
router.get('/profile', jwtMiddleware, (req, res) => {
  // Access the username from the decoded token
  const username = req.user.username;

  // Send back the username as a response
  res.json({ message: `Hello, ${username}!` });
});

module.exports = router;
