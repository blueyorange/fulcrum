import { Router } from "express";
import passport from "passport";
import { GoogleOneTapStrategy } from "passport-google-one-tap";
const router = Router();

passport.use(
  new GoogleOneTapStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      verifyCsrfToken: false,
    },
    (profile, done) => {
      // retrieve or add user to db
      done(undefined, profile);
    }
  )
);
passport.serializeUser(function (user, cb) {
  // correct approach is to grab user.id then return that
  // this will store user details in cookie which is unsafe
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  // retrieve user details from db
  return cb(null, user);
});

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
