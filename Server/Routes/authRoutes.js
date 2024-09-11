const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

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
module.exports = router;
