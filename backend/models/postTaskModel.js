const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  _id: String, // userId
  userTasks: {
    type: Map,
    of: new mongoose.Schema(
      {
        taskName: String,
        taskText: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      { _id: false } // Prevent automatic _id for nested schema
    ),
    default: {},
  },
});

module.exports = mongoose.model("Task", taskSchema);
