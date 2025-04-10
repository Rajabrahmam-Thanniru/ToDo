const Task = require("../models/postTaskModel");

const DeleteToDO = async (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;

  if (!userId || !taskId) {
    return res.status(400).json({ success: false, message: "userId and taskId are required" });
  }

  try {
    const taskDoc = await Task.findById(userId);

    if (!taskDoc) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!taskDoc.userTasks.has(taskId)) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    taskDoc.userTasks.delete(taskId); 
    await taskDoc.save(); 

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { DeleteToDO };
