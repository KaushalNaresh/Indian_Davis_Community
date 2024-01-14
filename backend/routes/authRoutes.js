const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

// signup route
router.post('/signup', authController.signup);

// login route
router.post('/login', authController.login);

// auth-check route
router.get('/check-auth', authenticateToken, authController.verifyToken);

router.post('/logout', authController.logout);

module.exports = router;