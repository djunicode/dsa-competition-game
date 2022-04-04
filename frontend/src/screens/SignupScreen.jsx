import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const CustomTextField = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      color="primary"
      sx={{}}
      {...props}
    />
  );
};

const SignupScreen = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/background.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: '#F1F1F1',
        width: '100%',
        height: '100vh',
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          backgroundColor: 'rgb(255, 255, 255, 0.1)',
          borderRadius: '7px',
          width: '900px',
          height: '560px',
          textAlign: 'center',
          backdropFilter: 'blur(57.4px)',
        }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: '2.3rem',
            color: '#8985F2',
            fontWeight: '700',
            margin: '2rem 0',
          }}>
          SIGNUP
        </Typography>
        <form>
          <Grid
            container
            sx={{ mt: 2, px: 7 }}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={4}>
            <Grid item md={6} sm={12}>
              <CustomTextField label="Username" />
            </Grid>
            <Grid item md={6} sm={12}>
              <CustomTextField label="Email" />
            </Grid>
            <Grid item md={6} sm={12}>
              <CustomTextField label="Password" />
            </Grid>
            <Grid item md={6} sm={12}>
              <CustomTextField label="Confirm Password" />
            </Grid>
          </Grid>
          <Box sx={{ m: 4, mb: 2 }}>
            <Box
              sx={{
                height: '4px',
                backgroundColor: '#f1f1f1',
                width: '6.3rem',
                display: 'inline-block',
                margin: '0 1rem 0.3rem',
                borderRadius: '2.5px',
              }}
            />
            <Typography
              variant="p"
              sx={{
                fontWeight: '600',
                margin: '1rem 0',
                fontSize: '1.2rem',
              }}>
              OR
            </Typography>
            <Box
              sx={{
                height: '4px',
                backgroundColor: '#f1f1f1',
                width: '6.3rem',
                display: 'inline-block',
                margin: '0 1rem 0.3rem',
                borderRadius: '2.5px',
              }}
            />
          </Box>
          <Box
            sx={{
              m: 2,
              marginBottom: '1.5rem',
              display: 'flex',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography
              variant="p"
              sx={{
                margin: '1rem 0',
                marginRight: '0.5rem',
                fontSize: '1rem',
              }}>
              Sign Up With
            </Typography>
            <a>
              <FcGoogle
                style={{
                  backgroundColor: '#f1f1f1',
                  width: '2.8rem',
                  height: '2.8rem',
                  borderRadius: '3.5px',
                  margin: '0 0.7rem',
                }}
              />
            </a>
            <a>
              <FaGithub
                style={{
                  backgroundColor: '#f1f1f1',
                  color: 'black',
                  width: '2.8rem',
                  height: '2.8rem',
                  borderRadius: '3.5px',
                  margin: '0 0.7rem',
                }}
              />
            </a>
          </Box>
          <Box sx={{ width: '30rem', margin: '0 auto' }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              style={{ fontSize: '1.3rem', fontWeigth: '600' }}>
              Sign Up
            </Button>
          </Box>
        </form>
        <Typography
          sx={{
            margin: '1rem 0',
            fontWeight: '300',
          }}>
          Already have an account?{' '}
          <a>
            <Typography
              color="primary"
              style={{
                fontWeight: '700',
                display: 'inline-block',
              }}>
              Login
            </Typography>
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupScreen;
