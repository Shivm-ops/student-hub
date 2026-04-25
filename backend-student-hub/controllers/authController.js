const jwt = require("jsonwebtoken");

// Hardcoded admin credentials as requested
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

/**
 * Handle admin login and return JWT
 */
const login = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const token = jwt.sign(
      { username: ADMIN_CREDENTIALS.username, role: "admin" },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "24h" },
    );

    return res.json({
      message: "Login successful",
      token,
    });
  }

  return res.status(401).json({ error: "Invalid username or password" });
};

module.exports = {
  login,
};
