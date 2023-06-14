import { Router } from "express";
import { getCourses, fetchCourseRoster } from "../google.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Teacher from "../views/teacher.js";

const router = new Router();

router.get("/", async (req, res) => {
  const { user } = req;
  let courses = await Course.find();
  courses = courses.map((course) => {
    return { id: course.id, name: course.name };
  });
  return res.send(Teacher({ courses, user }));
});

router.get("/sync", async (req, res, next) => {
  try {
    // get courses
    const courseResults = await getCourses(req.user.credentials);
    for (const courseResult of courseResults) {
      const { id, name } = courseResult;
      const course = await Course.findOneAndUpdate(
        { id: courseResult.id },
        { name: courseResult.name },
        { new: true, upsert: true }
      );

      const studentResults = await fetchCourseRoster(
        req.user.credentials,
        course.id
      );

      const studentPromises = studentResults.map(async (student) => {
        try {
          return await User.findOneAndUpdate(
            { id },
            { name: student.profile.name },
            { new: true, upsert: true }
          );
        } catch (error) {
          next(error);
        }
      });

      const students = await Promise.all(studentPromises);

      course.students = students;
      course.teachers.push(req.user);
      await course.save();
    }

    return res.redirect("/teacher");
  } catch (err) {
    next(err);
  }
});

export default router;
