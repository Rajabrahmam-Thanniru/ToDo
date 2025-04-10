import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        console.log("Login successful:", response.data.name);
        alert("Login successful!");
        nav("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      alert("Error logging in");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#d1eaef]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#128696]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#128696]"
        />
        <button
          onClick={handleLogin}
          className="w-full  text-white py-2 rounded-md bg-[#128696]"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => nav("/register")}
            className="text-[#128696]  cursor-pointer font-medium"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
