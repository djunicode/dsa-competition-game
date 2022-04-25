import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import dotenv from 'dotenv';
dotenv.config();
import User from '../Model/User.js';

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/user/signin/github/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      // console.log(profile);
      User.findOrCreate(
        {
          name: profile.username,
          email: profile._json.email,
        },
        (err, user) => {
          return cb(err, user);
        }
      );
    }
  )
);
