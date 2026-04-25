const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const verifyToken = require("../middleware/auth");

// Apply JWT verification to all student routes
router.use(verifyToken);

// GET /api/students -> Fetch all students
router.get("/", studentController.getAllStudents);

// POST /api/students -> Create a new student
router.post("/", studentController.createStudent);

// DELETE /api/students/:id -> Delete a student
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
