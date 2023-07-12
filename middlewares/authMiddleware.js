const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, "secretKey");

    // Add the decoded user data to the request object
    req.user = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.redirect("http:/localhost:3000/profile");
  }
};

module.exports = authMiddleware;
