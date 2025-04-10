const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
    
       
        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });
    
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });
    
          const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET, // Use env variable
          { expiresIn: "1h" }
        );
        res.json({ success: true, message: "Login successful!", token, name:user.fName,userId: user._id });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
};

module.exports = { LoginController };
