const express = require('express');
const { ProfileController } = require('../controllers/profileController');
const router = express.Router();

router.get("/:userId", ProfileController);

module.exports = router;