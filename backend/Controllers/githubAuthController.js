import passport from 'passport';

const githubSignin = passport.authenticate('github');

const githubCallback = (req, res) => {
  // console.log(req.user);
  res.redirect('/api/user/isGithubLogged');
};

const isGithubLogged = (req, res) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: 'Authorized',
      data: req.user,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'UnAuthorized',
    });
  }
};

const githubLogout = (req, res) => {
  req.session = null;
  req.logOut();
  return res.status(200).json({
    success: true,
    message: 'Logged out',
  });
};

const githubFailed = (req, res) => {
  return res.status(501).json({
    success: false,
    message: 'Failed',
  });
};

export {
  githubSignin,
  githubCallback,
  isGithubLogged,
  githubLogout,
  githubFailed,
};
