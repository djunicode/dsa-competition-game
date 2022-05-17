import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../Model/User.js';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/user/google/callback',
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log('profile from google config', profile);
      User.findOne({ googleId: profile.id }, async (err, user) => {
        if (err) {
          done(err, false);
        }

        if (!user) {
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName,
          });
          const token = await newUser.generateAuthToken();

          await newUser.save();
          done(null, { newUser, token });
        }
        const token = await user.generateAuthToken();
        return done(null, { token, user });
      });
    }
  )
);
