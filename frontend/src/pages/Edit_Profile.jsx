import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialProfile = location.state?.profile;

  const [fName, setFName] = useState(initialProfile?.fName || "");
  const [lName, setLName] = useState(initialProfile?.lName || "");
  const [email, setEmail] = useState(initialProfile?.email || "");
  const [dob, setDob] = useState(
    initialProfile?.dob
      ? new Date(initialProfile.dob).toISOString().split("T")[0]
      : ""
  );

  const handleUpdate = () => {
    const updatedProfile = {
      fName,
      lName,
      email,
      dob,
    };

    axios
      .put(
        `http://localhost:5000/user/profile/${initialProfile._id}`,
        updatedProfile
      )
      .then((res) => {
        if (res.data.success) {
          alert("Profile updated successfully!");
          navigate("/profile"); // navigate back to profile page
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Something went wrong while updating.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md border-[#128696]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md border-[#128696]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md border-[#128696]"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-4 py-2 border rounded-md border-[#128696]"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-[#128696] hover:bg-[#0f6d76] text-white py-2 rounded-md transition duration-300"
      >
        Update Changes
      </button>
    </div>
  );
};

export default EditProfile;
