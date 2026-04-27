const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", authMiddleware, roleMiddleware("admin"), createCourse);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateCourse);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteCourse);

module.exports = router;
