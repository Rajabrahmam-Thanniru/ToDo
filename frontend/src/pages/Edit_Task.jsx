import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Edit_Task() {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId, taskName, taskText } = location.state || {};

  const [newName, setNewName] = useState(taskName || "");
  const [newText, setNewText] = useState(taskText || "");

  const handleUpdate = async () => {
    console.log(newName, newText);
    const userId = localStorage.getItem("userId");
    if (!userId || !taskId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/update-ToDO/${userId}/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskName: newName,
            taskText: newText,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Task updated successfully!");
        navigate("/"); // Go back to task list
      } else {
        alert("Failed to update task.");
      }
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Error updating task.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Task</h2>

      <label className="block mb-2 font-medium">Task Name:</label>
      <input
        type="text"
        className="w-full border p-2 mb-4"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <label className="block mb-2 font-medium">Task Text:</label>
      <textarea
        className="w-full border p-2 mb-4"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleUpdate}
      >
        Update Changes
      </button>
    </div>
  );
}

export default Edit_Task;
