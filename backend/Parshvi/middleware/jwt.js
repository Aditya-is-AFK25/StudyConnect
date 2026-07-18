const jwt = require("jsonwebtoken");

module.expors = (req,res,next ) => {
    // reads authorization header
    const authHeader = req.heards.authorization;

    if (!authHeader)
        return res.status(401).json({
    message: "No token provided",
});
// gets only token
const token = authHeader.split(" ")[1];

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // stores user details
    next();
} catch (err) {
    return res.status(401).json({
        message: "Invalid token",
    });
}
};