const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
  login,
  signup,
  logout,
} = require("../controllers/Auth");

const { auth, isAdmin, isUser } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for user logout
router.post("/logout", logout);

// ********************************************************************************************************
//                                      Protected Routes (Example)
// ********************************************************************************************************

// Protected route - requires authentication
router.get("/test-auth", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Protected route for Tests",
    user: req.user,
  });
});

// Admin only route
router.get("/test-admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Protected route for Admin",
  });
});

// User only route
router.get("/test-user", auth, isUser, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Protected route for User",
  });
});

module.exports = router;

