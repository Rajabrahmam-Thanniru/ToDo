const express = require('express');
const { EditToDo } = require('../controllers/editController');
const validateTodo = require('../middleWare/validateToDo');
const router = express.Router();

router.put('/:userId/:taskId',validateTodo ,EditToDo);

module.exports = router;

