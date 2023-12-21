const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

// user_details route
router.get('/details', userController.details);

module.exports = router;