const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

// user_details route
router.post('/details', authenticateToken, userController.details);
router.post('/update', authenticateToken, userController.updateDetails);
router.get('/top6', authenticateToken, userController.getTopMatches);

module.exports = router;