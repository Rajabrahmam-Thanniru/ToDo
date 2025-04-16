// controllers/editController.js

const Task = require("../models/postTaskModel");

const EditToDo = async (req, res) => {
  const { userId, taskId } = req.params;
  const { taskName, taskText } = req.body;

  if (!userId || !taskId) {
    return res.status(400).json({
      success: false,
      message: "UserId and taskId are required",
    });
  }

  try {
    const taskDoc = await Task.findById(userId);

    if (!taskDoc) {
      return res.status(404).json({
        success: false,
        message: "No Task found for this user",
      });
    }

    if (!taskDoc.userTasks.has(taskId)) {
      return res.status(404).json({
        success: false,
        message: "No Task found with this taskId",
      });
    }

    // Update task
    taskDoc.userTasks.set(taskId, {
      taskName,
      taskText,
    });

    await taskDoc.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { EditToDo };
