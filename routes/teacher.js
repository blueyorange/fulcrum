import { Router } from "express";
import { getCourses } from "../google.js";

const router = new Router();

router.get("/", (req, res) => {
  console.log(req.user);
  const { user } = req;
  return res.send(`<h1>Welcome ${user.displayName}</h1>`);
});

router.get("/sync", async (req, res, next) => {
  try {
    const courses = await getCourses(req.user.credentials);
    return res.json(courses);
  } catch (err) {
    next(err);
  }
});

export default router;
