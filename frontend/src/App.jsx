import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import HomeScreen from "./pages/HomeScreen";
import NavBar from "./components/NavBar";
import Post_Task from "./pages/Post_Task";
import Edit_Task from "./pages/Edit_Task";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ShowTasks from "./pages/ShowTasks";
import { Edit } from "lucide-react";
import EditProfile from "./pages/Edit_Profile";

function AppContent() {
  const location = useLocation();
  const hideNavOnRoutes = ["/login", "/register"];

  function ProtectedRoute({ element }) {
    const isAuthenticated = localStorage.getItem("authToken");
    return isAuthenticated ? element : <Navigate to="/login" />;
  }

  return (
    <>
      {!hideNavOnRoutes.includes(location.pathname.toLowerCase()) && <NavBar />}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/show-tasks"
          element={<ProtectedRoute element={<ShowTasks />} />}
        />
        <Route
          path="/post-task"
          element={<ProtectedRoute element={<Post_Task />} />}
        />
        <Route path="/edit-task" element={<Edit_Task />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/edit_profile"
          element={<ProtectedRoute element={<EditProfile />} />}
        />
        <Route
          path="/edit-task"
          element={<ProtectedRoute element={<Edit_Task />} />}
        />{" "}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
