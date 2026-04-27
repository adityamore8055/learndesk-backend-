const Course = require("../models/Course");
const asyncHandler = require("../utils/asyncHandler");

const getAllCourses = asyncHandler(async (_req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.status(200).json(courses);
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.status(200).json(course);
});

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, instructor, thumbnail, lessons } = req.body;

  if (!title || !description || !instructor) {
    return res.status(400).json({ message: "Title, description and instructor are required" });
  }

  const course = await Course.create({
    title,
    description,
    instructor,
    thumbnail: thumbnail || "",
    lessons: Array.isArray(lessons) ? lessons : []
  });

  res.status(201).json({
    message: "Course created successfully",
    course
  });
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const { title, description, instructor, thumbnail, lessons } = req.body;

  course.title = title ?? course.title;
  course.description = description ?? course.description;
  course.instructor = instructor ?? course.instructor;
  course.thumbnail = thumbnail ?? course.thumbnail;
  course.lessons = Array.isArray(lessons) ? lessons : course.lessons;

  await course.save();

  res.status(200).json({
    message: "Course updated successfully",
    course
  });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  await course.deleteOne();

  res.status(200).json({ message: "Course deleted successfully" });
});

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
