const express = require('express');
const { DeleteToDO } = require('../controllers/deleteToDo');

const router = express.Router();

router.delete('/:userId/:taskId', DeleteToDO);

module.exports = router;
