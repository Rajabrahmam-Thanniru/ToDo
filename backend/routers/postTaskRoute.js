const express = require('express');
const { postTaskContoller } = require('../controllers/postTastController');
const validateTodo = require('../middleWare/validateToDo');
const router = express.Router();

router.post('/add',validateTodo ,postTaskContoller);

module.exports = router;