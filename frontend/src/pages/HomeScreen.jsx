import React from "react";

function HomeScreen() {
  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      {/* Welcome Message */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h1 className="text-4xl font-bold text-[#128696] mb-4 text-center">
          Welcome to To Do List App
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
          This app allows you to manage your daily activities efficiently. Below
          you'll find documentation on how to log in, register, and manage your
          tasks.
        </p>
      </div>

      {/* Getting Started Section */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-[#128696] mb-6">
          Getting Started
        </h2>

        {/* Login */}
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-2">1. Login</h3>
          <p>
            If you already have an account, log in to access your task
            dashboard.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Endpoint:</strong> <code>/login</code>
          </p>
        </div>

        {/* Register */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-lg mb-2">2. Register</h3>
          <p>
            New user? Register to create an account and start organizing your
            tasks.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Endpoint:</strong> <code>/register</code>
          </p>
        </div>
      </div>

      {/* Navigation Pages Section */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-[#128696] mb-6">
          Navigation Pages
        </h2>

        <div className="space-y-6">
          {/* Home */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 font-mono">GET /</div>
            <div className="p-4">
              <p>Displays general app information and dashboard guidance.</p>
            </div>
          </div>

          {/* Profile */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 font-mono">
              GET /profile
            </div>
            <div className="p-4">
              <p>View your user information and app-related account details.</p>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 font-mono">
              PUT /edit-profile
            </div>
            <div className="p-4">
              <p>
                Edit your profile information such as name, email, or password.
              </p>
            </div>
          </div>

          {/* Show Tasks */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 font-mono">
              GET /show-tasks
            </div>
            <div className="p-4">
              <p>
                View your list of tasks. You can edit or delete any task from
                this page.
              </p>
            </div>
          </div>

          {/* Add Task */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 font-mono">
              POST /post-task
            </div>
            <div className="p-4">
              <p>
                Add a new task to your list. Submit a title and description
                using a form.
              </p>
            </div>
          </div>

          {/* Edit Task */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 font-mono">
              PUT /edit-task
            </div>
            <div className="p-4">
              <p>Update the title or description of an existing task.</p>
            </div>
          </div>

          {/* Delete Task */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 font-mono">
              DELETE /delete-task
            </div>
            <div className="p-4">
              <p>Remove a task from your list permanently.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-[#128696] mb-4">
          Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Keep your session tokens secure</li>
          <li>Use strong passwords while registering</li>
          <li>Ensure your data is backed up regularly</li>
          <li>Log out after completing your tasks on shared devices</li>
        </ul>
      </div>
    </div>
  );
}

export default HomeScreen;
