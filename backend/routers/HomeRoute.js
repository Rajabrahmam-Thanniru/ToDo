// routers/userTasksRoute.js
const express = require('express');
const { Homecontroller } = require('../controllers/homeController');
const router = express.Router();

// Changed from /all-tasks to /:userId/tasks
router.get('/:userId/tasks', Homecontroller);

module.exports = router;