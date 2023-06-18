import { Router } from "express";
import { getCourses, fetchCourseRoster } from "../google.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Teacher from "../views/Teacher.js";
const router = new Router();

router.get("/", async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find({
      teachers: req.user._id,
    }).populate("students");
  } catch (err) {
    console.error(err);
    return next(err);
  }
  return res.send(Teacher({ courses, user: req.user }));
});

router.get("/sync", async (req, res, next) => {
  try {
    // get courses
    const courseResults = await getCourses(req.user.credentials);
    for (const courseResult of courseResults) {
      const course = await Course.findOneAndUpdate(
        { id: courseResult.id },
        { name: courseResult.name },
        { new: true, upsert: true }
      );

      const studentResults = await fetchCourseRoster(
        req.user.credentials,
        course.id
      );
      console.log(studentResults);

      const studentPromises = studentResults.map(async (student) => {
        try {
          return await User.findOneAndUpdate(
            { id: student.profile.id },
            {
              name: student.profile.name.givenName,
              givenName: student.profile.name.givenName,
              surname: student.profile.name.familyName,
            },
            { new: true, upsert: true }
          );
        } catch (err) {
          console.error(err);
          next(err);
        }
      });

      const students = await Promise.all(studentPromises);
      console.log(students);
      course.students = students;
      course.teachers.push(req.user);
      await course.save();
    }

    return res.redirect("/teacher");
  } catch (err) {
    if ((err.code = 401)) {
      res.redirect("/auth/login");
    }
    next(err);
  }
});

export default router;
