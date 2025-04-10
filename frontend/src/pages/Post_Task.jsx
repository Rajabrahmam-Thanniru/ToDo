import React from "react";
import { useFormik } from "formik";
import { postTaskSchema } from "../schema/postTaskSchema";
import { useState } from "react";

function Post_Task() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const formik = useFormik({
    initialValues: {
      taskName: "",
      taskText: "",
      userId: userId,
    },
    validationSchema: postTaskSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitted values:", values);
      try {
        const response = await fetch("http://localhost:5000/task/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // ✅ Capital "C" in Content-Type
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (data.success) {
          alert("Task submitted successfully!");
          resetForm(); // ✅ Clear the form after successful submission
        } else {
          alert(data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Error submitting task:", error);
        alert("Server error. Please try again later.");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Post a Task</h2>

        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="taskName" className="block mb-1 font-medium">
            Task Name
          </label>
          <input
            id="taskName"
            name="taskName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taskName}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.taskName && formik.errors.taskName && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.taskName}
            </p>
          )}
        </div>

        {/* Task Text */}
        <div className="mb-4">
          <label htmlFor="taskText" className="block mb-1 font-medium">
            Task Text
          </label>
          <textarea
            id="taskText"
            name="taskText"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taskText}
            rows="4"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.taskText && formik.errors.taskText && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.taskText}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
}

export default Post_Task;
