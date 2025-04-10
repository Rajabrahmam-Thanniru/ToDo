const User = require('../models/user');

const EditProfile = async (req, res) => {
  const userId = req.params.userId;
  const { fName, lName, email, dob } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  if (!fName?.trim() || !lName?.trim() || !email?.trim() || !dob?.trim()) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.fName = fName;
    user.lName = lName;
    user.email = email;
    user.dob = dob;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        dob: user.dob,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }
    console.error("Error updating profile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = EditProfile;
