import { Router } from "express";
import passport from "passport";
const router = Router();

router.post(
  "/google-one-tap",
  passport.authenticate("google-one-tap", { failureRedirect: "/" }),
  function (req, res, next) {
    res.redirect("/");
  }
);

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

export default router;
