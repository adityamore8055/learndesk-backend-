const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const connectDB = require("../config/db");
const User = require("../models/User");
const Course = require("../models/Course");

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Course.deleteMany({});

    const adminPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      name: "LearnDesk Admin",
      email: "admin@learndesk.com",
      password: adminPassword,
      role: "admin"
    });

    const courses = await Course.insertMany([
      {
        title: "Node.js Fundamentals",
        description: "Learn backend development basics with Node.js and Express.",
        instructor: "Jane Instructor",
        thumbnail: "https://example.com/node-course-thumbnail.jpg",
        lessons: [
          {
            title: "Introduction to Node.js",
            videoUrl: "https://example.com/videos/node-intro"
          },
          {
            title: "Express.js Basics",
            videoUrl: "https://example.com/videos/express-basics"
          }
        ]
      },
      {
        title: "MongoDB for Developers",
        description: "Master MongoDB schema design and querying with Mongoose.",
        instructor: "John Mentor",
        thumbnail: "https://example.com/mongodb-course-thumbnail.jpg",
        lessons: [
          {
            title: "MongoDB Essentials",
            videoUrl: "https://example.com/videos/mongodb-essentials"
          },
          {
            title: "Mongoose Models and Validation",
            videoUrl: "https://example.com/videos/mongoose-models"
          }
        ]
      }
    ]);

    console.log("Seed completed successfully");
    console.log("Admin credentials:");
    console.log("Email: admin@learndesk.com");
    console.log("Password: Admin@123");
    console.log(`Admin id: ${admin._id}`);
    console.log("Courses inserted:");
    courses.forEach((course) => {
      console.log(`- ${course.title} (${course._id})`);
    });

    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
