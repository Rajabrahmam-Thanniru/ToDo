const { v4: uuidv4 } = require("uuid");
const Task = require("../models/postTaskModel");

const postTaskContoller = async (req, res) => {
  const { userId, taskName, taskText } = req.body;

  try {
    const taskId = uuidv4(); // Unique ID for each task
    const createdAt = new Date(); // Current timestamp

    let taskDoc = await Task.findById(userId);

    const newTask = {
      taskName,
      taskText,
      createdAt,
    };

    if (!taskDoc) {
      taskDoc = new Task({
        _id: userId,
        userTasks: {
          [taskId]: newTask,
        },
      });
    } else {
      taskDoc.userTasks.set(taskId, newTask);
    }

    await taskDoc.save();
    res.status(200).json({ success: true, message: "Task saved successfully" });
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { postTaskContoller };
