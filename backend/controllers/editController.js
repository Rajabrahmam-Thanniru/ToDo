const Task = require("../models/postTaskModel");

const EditToDo = async (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;
  const { taskName, taskText } = req.body;
  console.log(req.body);

  if (!userId || !taskId) {
    return res.status(400).json({
      success: false,
      message: "UserId and taskId are required",
    });
  }

  if (!taskName || !taskText) {
    return res.status(400).json({
      success: false,
      message: "Task Name and Task Text are required",
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

    const existingTask = taskDoc.userTasks.get(taskId);

    taskDoc.userTasks.set(taskId, {
      //...existingTask, // keep createdAt
      taskName,
      taskText,
    });

    await taskDoc.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (e) {
    console.error("Error updating task", e);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { EditToDo };
