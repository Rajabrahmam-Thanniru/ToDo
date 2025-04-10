const express = require('express');
const { EditToDo } = require('../controllers/editController');
const router = express.Router();

router.put('/:userId/:taskId', EditToDo);

module.exports = router;

