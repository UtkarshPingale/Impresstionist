const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");

    // Check if no auth header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    // Get token from Bearer format
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    // Handle admin token
    if (token === "admin-token") {
      req.user = {
        userId: "admin",
        role: "admin",
        isAdmin: true,
      };
      return next();
    }

    // Verify JWT token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        throw new Error("Token verification failed");
      }
      req.user = {
        userId: decoded.userId,
        role: decoded.role || "user",
        isAdmin: decoded.role === "admin",
      };
      next();
    } catch (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication",
    });
  }
};
