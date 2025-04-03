const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');
// const authenticateToken = require('../middleware/authenticateToken');
const auth = require('../middleware/authenticateToken');

// user_details route
router.get('/details', auth, userController.details);
router.post('/details', auth, userController.updateDetails);
router.get('/top6', auth, userController.getTopMatches);
router.post('/interact', auth, userController.likeUser);
router.get('/interactions', auth, userController.getUserInteractions);

module.exports = router;