import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //in miliseconds
        httpOnly: true, //prevent XSS attack
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "developement",
    });
};

export default generateTokenAndSetCookies;
