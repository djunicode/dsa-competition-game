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
  const {
    displayName: username,
    emails: [{ value: email }],
    id: googleId,
  } = req.user;
  try {
    const findUser = await User.findOne({ googleId });
    if (findUser) {
      const token = await findUser.generateAuthToken();
      res.status(200).json({
        success: true,
        data: token,
        findUser,
        message: 'User logged in successfully',
      });
    } else {
      const newUser = new User({ username, email, googleId });
      const token = await newUser.generateAuthToken();
      await newUser.save();
      res.status(200).json({
        success: true,
        data: token,
        newUser,
        message: 'User successfully registered',
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export { googleCallback, googleLogout, googleFailed, googleSuccess };
