import { Router } from "express";
import passport from "passport";
import Login from "../views/Login.js";
const router = Router();

router.get("/login", (req, res) => {
  return res.send(Login());
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/classroom.courses.readonly",
      "https://www.googleapis.com/auth/classroom.rosters",
    ],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  function (req, res, next) {
    res.redirect("/");
  }
);

router.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
  });
  res.redirect("/");
});

export default router;
