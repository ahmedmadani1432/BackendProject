// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "No token provided", success: false });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Add JWT_SECRET in .env
//         req.user = decoded; // this will have { email, name, id }
//         next();
//     } catch (err) {
//         console.error(err);
//         res.status(401).json({ message: "Invalid token", success: false });
//     }
// };

// module.exports = verifyToken;
