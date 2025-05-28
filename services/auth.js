const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const isLogedin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // return res.status(401).send("Please login first.");
        return res.render("login",{message:"You need to Login first"})
    }

    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.user = data;
        next(); // ✅ allow the request to move forward
    } catch (err) {
        console.error("Invalid Token:", err.message);
        return res.status(403).send("Invalid or expired token.");
    }
};

module.exports = {
    isLogedin,
};
