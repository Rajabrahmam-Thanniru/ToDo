import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";

const NavBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) setUserName(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setUserName(null);
    nav("/");
  };

  return (
    <nav className="bg-[#128696] p-4 flex items-center justify-between">
      {/* Logo */}
      <h2 className="text-white text-xl font-bold">TodoApp</h2>

      {/* Center Nav Links */}
      <ul className="flex space-x-6 justify-center items-center flex-1">
        <li>
          <Link
            to="/"
            className={`text-white hover:text-gray-300 ${
              path === "/" ? "text-lg font-semibold underline" : "text-base"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/show-tasks"
            className={`text-white hover:text-gray-300 ${
              path === "/show-tasks"
                ? "text-lg font-semibold underline"
                : "text-base"
            }`}
          >
            Show Tasks
          </Link>
        </li>
        <li>
          <Link
            to="/post-task"
            className={`text-white hover:text-gray-300 ${
              path === "/post-task"
                ? "text-lg font-semibold underline"
                : "text-base"
            }`}
          >
            Add Task
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`text-white hover:text-gray-300 ${
              path === "/profile"
                ? "text-lg font-semibold underline"
                : "text-base"
            }`}
          >
            Profile
          </Link>
        </li>
      </ul>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-4">
        {userName ? (
          <>
            <span className="text-white hidden sm:inline">
              Welcome, {userName}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-[#00a8cd] to-[#9bd3dd] rounded-md text-[#354b45] transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => nav("/login")}
            className="px-4 py-2 bg-gradient-to-r from-[#00a8cd] to-[#9bd3dd] rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
