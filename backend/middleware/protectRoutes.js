import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;

        next();
    } catch (err) {
        console.log(`${err.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
