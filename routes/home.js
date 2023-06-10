import { Router } from "express";
const router = Router();
import Home from "../views/Home.js";
import { google } from "googleapis";

router.get("/", (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  return res.send(Home({ user: req.user }));
});

router.get("/sync", async (req, res, next) => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/"
  );
  console.log(req.user);
  auth.setCredentials({
    access_token: req.user.credentials.accessToken,
  });
  const classroom = google.classroom({
    version: "v1",
    auth,
  });

  const response = await classroom.courses.list();
  const courses = response.data.courses;
  console.log(courses);
  return res.redirect("/");
});

export default router;
