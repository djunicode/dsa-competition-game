const express = require('express');

const googleCallback = (req, res) => {
  console.log(req.user);
  res.redirect('/googleSuccess');
};

const googleLogout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};

const googleFailed = (req, res) => {
  res.send('Failed');
};

const googleSuccess = (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
};

module.exports = {
  googleCallback,
  googleLogout,
  googleFailed,
  googleSuccess,
};
