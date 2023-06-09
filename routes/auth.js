import { Router } from "express";
import passport from "passport";
const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/classroom.courses.readonly",
    ],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
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
