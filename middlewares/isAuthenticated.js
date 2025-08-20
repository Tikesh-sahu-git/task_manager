const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ If no token in header, check cookies
    if (!token && req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // 3️⃣ If no token found at all
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded payload to req.user

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuthenticated;
