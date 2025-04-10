const Task = require('../models/postTaskModel');

const Homecontroller = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json({ success: false, message: "userId is required" });

  try {
    const taskDoc = await Task.findById(userId);
    if (!taskDoc) return res.status(200).json({ success: true, data: {} });

    const tasksMap = taskDoc.userTasks || new Map();
    const responseData = {};

    for (const [taskId, taskData] of tasksMap.entries()) {
      responseData[taskId] = {
        taskName: taskData.taskName,
        taskText: taskData.taskText,
        createdAt: taskData.createdAt,
      };
    }

    res.status(200).json({ success: true, data: responseData });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { Homecontroller };
