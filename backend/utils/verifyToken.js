const jwt = require('jsonwebtoken');

// Middleware to verify the token and attach user data
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "Token is missing. Please log in." });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error("JWT Verification Error:", err); // Log the error for debugging
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        req.user = user; // Attach user info to request object
        next(); // Pass control to the next middleware
    });
};

// Middleware to verify user access (same user or admin)
const verifyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, message: "Token is invalid" });

    req.user = user; // ✅ user info is attached here
    next();
  });
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next(); // Admin can access this resource
        } else {
            return res.status(403).json({ success: false, message: "You do not have admin privileges" });
        }
    });
};

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
};
