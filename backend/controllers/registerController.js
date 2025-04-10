const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerController = async (req, res) => {
    try {
        const { fName, lName, email, dob, password } = req.body;
        
        const f_name = fName?.trim();
        const l_name = lName?.trim();
        const Email = email?.trim();
        const Dob = dob?.trim();
        const pwd = password?.trim();

        if (!f_name || !l_name || !Email || !Dob || !pwd) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

    
        const existingUser = await User.findOne({ email: Email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

   
        const hashedPassword = await bcrypt.hash(pwd, 10);

        const newUser = new User({
            fName: f_name,
            lName: l_name,
            email: Email,
            dob: Dob,
            password: hashedPassword
        });

      
        await newUser.save();

       
        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

module.exports = { registerController };
