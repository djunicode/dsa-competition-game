const googleCallback = (req, res) => {
  console.log(req.user);
};

const googleLogout = (req, res) => {
  req.session = null;
  req.logout();
  res.clearCookie('token');
  res.status(200).json({ message: 'Google logout success' });
};

const googleFailed = (req, res) => {
  res.status(401).json({ message: 'Login Failed' });
};

const googleSuccess = async (req, res) => {
  res
    .cookie('token', req.user.token)
    .redirect('http://localhost:3000/landingPage');
};

export { googleCallback, googleLogout, googleFailed, googleSuccess };
