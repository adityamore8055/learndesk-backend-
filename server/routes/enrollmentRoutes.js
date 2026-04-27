const express = require("express");
const {
  enrollInCourse,
  getUserEnrollments,
  updateProgress
} = require("../controllers/enrollmentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/enroll/:courseId", authMiddleware, enrollInCourse);
router.get("/enrollments", authMiddleware, getUserEnrollments);
router.put("/progress/:courseId", authMiddleware, updateProgress);

module.exports = router;
