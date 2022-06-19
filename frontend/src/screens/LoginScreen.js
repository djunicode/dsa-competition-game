import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import login from '../actions/userAction';
import background from '../images/background.jpg';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [snackBools, setSnackBools] = useState({
    successOpen: false,
    errorOpen: false,
  });
  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBools({ ...snackBools, successOpen: false });
    navigate('/landingPage');
  };
  const handleErorrClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBools({ ...snackBools, errorOpen: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== undefined || password !== undefined) {
      console.log(email, password);
      dispatch(login(email, password));
    }
  };

  useEffect(() => {
    if (error) {
      setSnackBools({ ...snackBools, errorOpen: true });
    }
    if (userInfo) {
      setSnackBools({ ...snackBools, successOpen: true });
    }
  }, [error, userInfo]);


  const useStyles = makeStyles(() => ({
    outerGrid: {
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    },
    card: {
      background: 'rgba( 84, 78, 78, 0.35 )!important',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )!important',
      backdropFilter: 'blur( 3.5px )!important',

      border: '1px solid rgba( 255, 255, 255, 0.18 )!important',
      width: '600px',
      height: '400px',
      backgroundColor: 'none!important',
      // boxShadow: "none",
    },
  }));

  const classes = useStyles();
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.outerGrid}
    >
      <div>
        <Box
          style={{
            width: '600px',
            height: '400px',
          }}
        >
          <Card sx={{ marginLeft: '20px' }} className={classes.card}>
            <CardContent
              style={{
                width: '600px',
                height: '400px',
              }}
            >
              <Grid
                container
                style={{ gap: 25 }}
                display="flex"
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  marginTop="2px"
                  style={{ color: '#8985F2', fontWeight: '700' }}
                >
                  LOGIN
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <Grid
                    item
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <label htmlFor="email" style={{ color: 'white' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ height: '40px', width: '300px' }}
                    />
                  </Grid>
                  <Grid
                    item
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <label
                      htmlFor="password"
                      style={{ color: 'white' }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ height: '40px', width: '300px' }}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      background: '#8985F2',
                      borderRadius: '3.5px',
                      width: '300px',
                      height: '40px',
                      marginTop: '20px',
                    }}
                  >
                    LOGIN
                  </Button>
                </Box>
                <Typography style={{ color: 'white' }}>
                  Dont have and account?{' '}
                  <span
                    style={{ color: '#8985F2', fontWeight: '700' }}
                  >
                    <Link style={{ textDecoration: 'none' }} to="/signup">
                      Sign Up
                    </Link>
                  </span>
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </div>
      <Snackbar
        open={snackBools.successOpen}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
      >
        <MuiAlert
          severity="success"
          sx={{ width: '100%' }}
          onClose={handleSuccessClose}
        >
          User successfully logged in!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={snackBools.errorOpen}
        autoHideDuration={3000}
        onClose={handleErorrClose}
      >
        <MuiAlert
          severity="error"
          sx={{ width: '100%' }}
          onClose={handleErorrClose}
        >
          {error ? error.message : ''}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
}
