import passport from "passport";
import User from "./models/User.js";
// import { GoogleOneTapStrategy } from "passport-google-one-tap";
import { Strategy } from "passport-google-oauth20";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // retrieve or add user to db
      const { id, name, displayName } = profile;
      // All new users are students by default! *************
      const role = "student";
      let user = await User.findOne({ id }).exec();
      if (!user) {
        console.log("User not found, creating...");
        user = await User.create({
          id,
          name,
          displayName,
          role,
          credentials: { accessToken, refreshToken },
        });
      }
      done(null, user);
    }
  )
);
passport.serializeUser(function (user, done) {
  // correct approach is to grab user.id then return that
  // this will store user details in cookie which is unsafe
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // retrieve user details from db
  return done(null, user);
});
