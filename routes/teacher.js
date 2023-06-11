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
    const courses = await getCourses(req.user.credentials);
    courses.forEach(async (course) => {
      const { id, name } = course;
      await Course.findOneAndUpdate({ id }, { name });
    });
    // get students on all courses
    const promises = courses.map(async (course) => {
      return await fetchCourseRoster(req.user.credentials, course.id);
    });
    const results = await Promise.all(promises);
    const students = [].concat(...results);
    console.log(students[0].profile);
    return res.json(students);
  } catch (err) {
    next(err);
  }
});

export default router;
