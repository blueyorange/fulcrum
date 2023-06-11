import { Router } from "express";
import { google } from "googleapis";
const router = new Router();

router.get("/", (req, res) => {
  console.log(req.user);
  const { user } = req;
  return res.send(`<h1>Welcome ${user.displayName}</h1>`);
});

router.get("/sync", async (req, res, next) => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/"
  );
  auth.setCredentials({
    access_token: req.user.credentials.access_token,
  });
  const classroom = google.classroom({
    version: "v1",
    auth,
  });

  const response = await classroom.courses.list();
  const courses = response.data.courses;
  return res.json(courses);
});

export default router;