import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { register } from '../actions/userActions';

const SignupScreen = () => {
  const {
    handleSubmit,
    formState: { errors, touchedFields },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  console.log(errors);
  console.log(`touchedFields: ${touchedFields.username}`);

  const onSubmit = (data) =>
    dispatch(
      register(
        getValues('username'),
        getValues('email'),
        getValues('password'),
      ),
    );

  const matchesM = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const matchesS = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  console.log(matchesM, matchesS);
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
          width: matchesM ? '56rem' : matchesS ? '37rem' : '88%',
          height: matchesM ? '38rem' : '42rem',
          textAlign: 'center',
          backdropFilter: 'blur(57.4px)',
          paddingBottom: matchesM ? '' : '0.7rem',
          margin: matchesM ? '' : '2rem 0',
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{ mt: 2, px: matchesS ? 7 : 1 }}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={matchesM ? 4 : 2}>
            <Grid item md={6} sm={12}>
              <Controller
                name="username"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Username"
                    id="username"
                    autoFocus="true"
                    error={errors.username}
                    helperText={errors.username ? 'Username is required' : ' '}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Email"
                    id="email"
                    error={errors.email}
                    helperText={errors.email ? 'Enter a valid email' : ' '}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Password"
                    id="password"
                    type="password"
                    error={errors.password}
                    helperText={
                      errors.password ? 'Enter a valid 6 digit password' : ' '
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    color="primary"
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    error={
                      getValues('password') !== getValues('confirmPassword')
                    }
                    helperText={
                      getValues('password') !== getValues('confirmPassword')
                        ? 'Both passwords do not match!'
                        : ' '
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ m: matchesS ? 4 : 2, mb: 2 }}>
            <Box
              sx={{
                height: '4px',
                backgroundColor: '#f1f1f1',
                width: matchesS ? '6.3rem' : '4.5rem',
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
                width: matchesS ? '6.3rem' : '4.5rem',
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
                marginRight: matchesS ? '0.5rem' : '0',
                fontSize: '1rem',
              }}>
              Sign Up With
            </Typography>
            <a>
              <FcGoogle
                style={{
                  backgroundColor: '#f1f1f1',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '3.5px',
                  padding: '0.3rem',
                  margin: '0 0.7rem',
                }}
              />
            </a>
            <a>
              <FaGithub
                style={{
                  backgroundColor: '#f1f1f1',
                  color: 'black',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '3.5px',
                  margin: '0 0.7rem',
                  padding: '0.3rem',
                }}
              />
            </a>
          </Box>
          <Box sx={{ width: matchesS ? '30rem' : '10rem', margin: '0 auto' }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              type="submit"
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
