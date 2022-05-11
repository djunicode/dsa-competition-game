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
      console.log('profile from github config', profile);
      User.findOne({ githubId: profile.id }, async (err, user) => {
        if (err) {
          cb(err, false);
        }
        if (!user) {
          const newUser = new User({
            githubId: profile.id,
            email: profile._json.email
              ? profile._json.email
              : 'thisEmailIsNotValid@gmail.com',
            username: profile.displayName,
          });
          const token = await newUser.generateAuthToken();

          await newUser.save();
          cb(null, { newUser, token });
        }
        const token = await user.generateAuthToken();
        return cb(null, { token, user });
      });
    }
  )
);
