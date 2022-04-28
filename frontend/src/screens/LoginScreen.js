import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import background from '../images/background.jpg';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import login from '../actions/userAction';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== undefined || password !== undefined) {
      console.log(name, password);
      dispatch(login(name, password));
    }
  };

  const classes = useStyles();
  return (
    <>
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
            <Card
              sx={{ marginLeft: '20px' }}
              className={classes.card}
            >
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
                      <label
                        htmlFor="name"
                        style={{ color: 'white' }}
                      >
                        Username
                      </label>
                      <input
                        type="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    Don't have and account?{' '}
                    <span
                      style={{ color: '#8985F2', fontWeight: '700' }}
                    >
                      Sign Up
                    </span>
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </div>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(() => ({
  outerGrid: {
    width: '150vw',
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
