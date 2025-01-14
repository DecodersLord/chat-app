import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } =
            req.body;

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Password does not match" });
        }

        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            //Generate JWT token here
            await generateTokenAndSetCookies(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
            });
        } else {
            return res.status(400).json({ error: "Invalid User data" });
        }
    } catch (err) {
        res.status(500).json({ error: `Internal Server error ${err.message}` });
    }
};

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || ""
        );

        if (!user || !isPasswordCorrect) {
            return res
                .status(400)
                .json({ error: "Invalid Username or Password" });
        }

        generateTokenAndSetCookies(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
        });
    } catch (err) {
        res.status(500).json({ error: `Internal server error ${err.message}` });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out succesfully" });
    } catch (err) {
        res.status(500).json({ error: `Internal server error ${err.message}` });
    }
};
