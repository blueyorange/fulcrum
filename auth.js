import passport from "passport";
import User from "./models/User.js";
import { Strategy } from "passport-google-oauth20";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (access_token, refresh_token, profile, done) => {
      // retrieve or add user to db
      const { id, name, displayName } = profile;
      // All new users are students by default! *************
      const role = "student";
      let user = await User.findOne({ id }).exec();
      if (!user) {
        user = await User.create({
          id,
          name,
          displayName,
          role,
          credentials: { access_token, refresh_token },
        });
      } else {
        user.credentials = { access_token, refresh_token };
      }
      done(null, user);
    }
  )
);
// TODO: serialise id only
passport.serializeUser(function (user, done) {
  // correct approach is to grab user.id then return that
  // this will store user details in cookie which is unsafe
  process.nextTick(function () {
    return done(null, user);
  });
});

passport.deserializeUser(function (user, done) {
  // retrieve user details from db
  process.nextTick(function () {
    return done(null, user);
  });
});
