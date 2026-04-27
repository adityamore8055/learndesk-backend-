const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const asyncHandler = require("../utils/asyncHandler");

const enrollInCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const existingEnrollment = await Enrollment.findOne({ userId, courseId });
  if (existingEnrollment) {
    return res.status(409).json({ message: "Already enrolled in this course" });
  }

  const enrollment = await Enrollment.create({
    userId,
    courseId,
    progress: 0,
    completedLessons: []
  });

  res.status(201).json({
    message: "Enrollment successful",
    enrollment
  });
});

const getUserEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ userId: req.user._id })
    .populate("courseId")
    .sort({ updatedAt: -1 });

  res.status(200).json(enrollments);
});

const updateProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { progress, completedLessons } = req.body;

  const enrollment = await Enrollment.findOne({
    userId: req.user._id,
    courseId
  });

  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found for this course" });
  }

  if (typeof progress === "number") {
    if (progress < 0 || progress > 100) {
      return res.status(400).json({ message: "Progress must be between 0 and 100" });
    }
    enrollment.progress = progress;
  }

  if (Array.isArray(completedLessons)) {
    enrollment.completedLessons = completedLessons;
  }

  await enrollment.save();

  res.status(200).json({
    message: "Progress updated successfully",
    enrollment
  });
});

module.exports = {
  enrollInCourse,
  getUserEnrollments,
  updateProgress
};
