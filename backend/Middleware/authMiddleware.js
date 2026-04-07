const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  // Get Authorization header - try multiple methods
  const authHeader = req.header("Authorization") || req.headers.authorization;
  console.log("=== AUTH MIDDLEWARE DEBUG ===");
  console.log("Authorization header:", authHeader ? "EXISTS" : "MISSING");
  if (authHeader) {
    console.log("Header value preview:", authHeader.substring(0, 30) + "...");
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No valid Authorization header found");
    return res.status(400).json({ message: "User is not authenticated" });
  }

  const token = authHeader.replace("Bearer ", "").trim();
  console.log("Extracted token length:", token.length);
  console.log("Token preview:", token.substring(0, 20) + "...");

  if (!token) {
    console.log("Token is empty after extraction");
    return res.status(400).json({ message: "User is not authenticated" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified successfully. User ID:", verified._id);
    req.user = verified;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    console.error("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    res.status(401).json({ message: `Invalid Token: ${error.message}` });
  }
};

const checkRole = (role) => (req, res, next) => {
  if (req.user?.roles?.[role]) return next();
  res.status(403).json({ message: "Access Denied" });
};

module.exports = { authenticateJWT, checkRole }; // Fixed export
