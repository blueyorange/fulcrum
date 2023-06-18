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
      try {
        const role = "student";
        let user = await User.findOne({ id: profile.id }).exec();

        if (!user) {
          user = await User.create({
            id: profile.id,
            name: profile.name.givenName,
            givenName: profile.name.givenName,
            surname: profile.name.familyName,
            role,
            credentials: { access_token, refresh_token },
          });
        } else {
          user.credentials = { access_token, refresh_token };
        }

        // Saving the user or updating credentials
        await user.save();

        done(null, user);
      } catch (error) {
        done(error, null); // Pass the error to the callback
      }
    }
  )
);

// TODO: serialise id only
passport.serializeUser(function (user, done) {
  // correct approach is to grab user.id then return that
  // this will store user details in cookie which is unsafe
  process.nextTick(function () {
    return done(null, user._id.toString());
  });
});

passport.deserializeUser(async function (_id, done) {
  // retrieve user details from db
  let user;
  try {
    user = await User.findOne({ _id });
  } catch (err) {
    done(err, null);
  }
  process.nextTick(function () {
    return done(null, user);
  });
});
