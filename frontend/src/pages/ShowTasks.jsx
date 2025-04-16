import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
function ShowTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const deleteTask = async (taskId) => {
    const userId = localStorage.getItem("userId");
    if (!userId || !taskId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/delete-ToDO/${userId}/${taskId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.taskId !== taskId)
        );
      } else {
        console.error("Failed to delete task:", data.message);
      }
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("No userId found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/users/${userId}/tasks`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.success && data.data) {
          const userTasks = Object.entries(data.data).map(
            ([taskId, taskData]) => ({
              taskId,
              ...taskData,
            })
          );
          setTasks(userTasks);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err.message);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 bg-[#d1eaef]">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          No tasks found. To add tasks, press on "Add Task".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <div
              key={task.taskId || index}
              className="bg-white rounded-lg shadow p-4 relative"
            >
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="text-gray-400 hover:text-blue-700"
                  onClick={() =>
                    navigate("/edit-task", {
                      state: {
                        taskId: task.taskId,
                        taskName: task.taskName,
                        taskText: task.taskText,
                      },
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="text-gray-400 hover:text-red-700"
                  onClick={() => deleteTask(task.taskId)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>

              <h3 className="text-lg font-semibold mb-2">{task.taskName}</h3>
              <p className="text-gray-700">{task.taskText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowTasks;
