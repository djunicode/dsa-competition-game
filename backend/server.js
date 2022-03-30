const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./Model/passport');
const oauthRoutes = require('./Routes/oauthRoutes');

const app = express();
app.use(cookieSession({ name: 'google-auth-session', keys: ['key1', 'key2'] }));
app.use(passport.initialize());
app.use(passport.session());

app.use(oauthRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});
