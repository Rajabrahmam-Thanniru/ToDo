const express = require('express');
const router = express.Router();
const EditProfile = require('../controllers/editProfile');


router.put('/profile/:userId', EditProfile);

module.exports = router;
