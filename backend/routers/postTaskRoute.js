const express = require('express');
const { postTaskContoller } = require('../controllers/postTastController');
const router = express.Router();

router.post('/add', postTaskContoller);

module.exports = router;