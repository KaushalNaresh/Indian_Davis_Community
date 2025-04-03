const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');
// const authenticateToken = require('../middleware/authenticateToken');
const auth = require('../middleware/authenticateToken');

// user_details route
router.get('/details', auth, userController.details);
router.post('/details', auth, userController.updateDetails);
router.get('/top6', auth, userController.getTopMatches);
router.post('/like', auth, userController.likeUser);
router.post('/unlike', auth, userController.unlikeUser);
router.get('/liked-users', auth, userController.getLikedUsers);

module.exports = router;