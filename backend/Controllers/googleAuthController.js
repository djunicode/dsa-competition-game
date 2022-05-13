import User from '../Model/User.js';

const googleCallback = (req, res) => {
  console.log(req.user);

  res.redirect('/api/user/googleSuccess');
};

const googleLogout = (req, res) => {
  req.session = null;
  req.logout();
  res.status(200).json({ message: 'Google logout success' });
};

const googleFailed = (req, res) => {
  res.status(401).json({ message: 'Login Failed' });
};

const googleSuccess = async (req, res) => {
  res.status(200).json({
    ...req.user,
  });
};

export { googleCallback, googleLogout, googleFailed, googleSuccess };
