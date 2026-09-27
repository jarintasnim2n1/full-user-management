import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ১. ডাটাবেজে গুগল আইডি দিয়ে ইউজার চেক করা
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // ইউজার না থাকলে নতুন অ্যাকাউন্ট তৈরি করা
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0]?.value,
            avatar: profile.photos[0]?.value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;