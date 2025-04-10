import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/profile/${userId}`)
      .then((res) => {
        if (res.data.success) {
          setProfile(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);

  if (!profile) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="relative max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      {/* Floating Edit Button (Top-right) */}
      <button
        onClick={() => navigate("/edit_profile", { state: { profile } })}
        className="absolute top-4 right-4 bg-[#128696] hover:bg-[#0f6d76] text-white p-2 rounded-full shadow-md transition-all duration-300"
      >
        <Pencil className="w-4 h-4" />
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          value={profile.fName}
          readOnly
          className="w-full px-4 py-2 border rounded-md bg-gray-100 border-[#128696] border-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          value={profile.lName}
          readOnly
          className="w-full px-4 py-2 border rounded-md bg-gray-100 border-[#128696] border-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={profile.email}
          readOnly
          className="w-full px-4 py-2 border rounded-md bg-gray-100 border-[#128696] border-2"
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 mb-1">Date of Birth</label>
        <input
          type="date"
          value={new Date(profile.dob).toISOString().split("T")[0]}
          readOnly
          className="w-full px-4 py-2 border rounded-md bg-gray-100 border-[#128696] border-2"
        />
      </div>
    </div>
  );
}

export default Profile;
