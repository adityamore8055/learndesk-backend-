const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Lesson title is required"],
      trim: true
    },
    videoUrl: {
      type: String,
      required: [true, "Lesson video URL is required"],
      trim: true
    }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true
    },
    instructor: {
      type: String,
      required: [true, "Instructor name is required"],
      trim: true
    },
    thumbnail: {
      type: String,
      default: ""
    },
    lessons: {
      type: [lessonSchema],
      default: []
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

module.exports = mongoose.model("Course", courseSchema);
