import React from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function JoinRoomModal() {
  return (
    <Dialog
      open
      sx={{
        backdropFilter: 'blur(8px)',
      }}
      PaperProps={{
        sx: {
          width: '35%',
          height: '54%',
          borderRadius: '15px',
          boxShadow: 'none',
        },
      }}
      maxWidth="sm"
    >
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            height: '40px',
            width: '40%',
            borderRadius: '8.41px',
            textAlign: 'center',
            backgroundColor: '#7879F1',
            color: '#FFFFFF',
            margin: '24px auto',
            paddingTop: '10px',
            fontWeight: '700',
            lineHeight: '30px',
          }}
        >
          ☁️ Akatsuki ☁️
        </Typography>
        <Box sx={{ width: '100%', marginBottom: '8px' }}>
          <Grid container rowSpacing={1}>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                component="text"
                align="left"
                sx={{
                  display: 'flex',
                  paddingLeft: '30px',
                  fontSize: '16px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '5px',
                  }}
                >
                  <AccountCircleIcon />
                </Box>
                Host: Meet Patel
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{
                  display: 'flex',
                  paddingLeft: '150px',
                  fontSize: '18px',
                }}
              >
                7/10
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '5px',
                  }}
                >
                  <PeopleIcon />
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                align="left"
                sx={{
                  paddingLeft: '60px',
                }}
              >
                Rounds: 10
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{
                  paddingLeft: '100px',
                }}
              >
                Difficulty: Easy
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider
          variant="middle"
          sx={{
            height: '1px',
            backgroundColor: '#DDDDDD',
            borderRadius: '18.4347px',
          }}
        />
        <Typography
          sx={{
            marginLeft: '35px',
            marginTop: '5px',
            marginBottom: '2px',
            fontSize: '17px',
          }}
        >
          Players
        </Typography>
        <Box>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            {/* {players.map((player) => {   //For future use
              return (
                <Grid item xs={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar
                      sx={{
                        fontSize: '15px',
                        bgcolor: '#7879F1',
                        color: '#000000',
                        border: '1px solid #000',
                        height: '25%',
                        width: '12%',
                        lineHeight: '1.1',
                      }}
                    >
                      {player.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      sx={{
                        marginLeft: '5px',
                        fontSize: '14px',
                      }}
                    >
                      {player.name}
                    </Typography>
                  </Box>
                </Grid>
              );
            })} */}
            <Grid item xs={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    fontSize: '15px',
                    bgcolor: '#7879F1',
                    color: '#000000',
                    border: '1px solid #000',
                    height: '25%',
                    width: '12%',
                    lineHeight: '1.1',
                  }}
                >
                  U
                </Avatar>
                <Typography
                  sx={{
                    marginLeft: '5px',
                    fontSize: '14px',
                  }}
                >
                  User 1
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    fontSize: '15px',
                    bgcolor: '#7879F1',
                    color: '#000000',
                    border: '1px solid #000',
                    height: '25%',
                    width: '12%',
                    lineHeight: '1.1',
                  }}
                >
                  U
                </Avatar>
                <Typography
                  sx={{
                    marginLeft: '5px',
                    fontSize: '14px',
                  }}
                >
                  User 2
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    fontSize: '15px',
                    bgcolor: '#7879F1',
                    color: '#000000',
                    border: '1px solid #000',
                    height: '25%',
                    width: '12%',
                    lineHeight: '1.1',
                  }}
                >
                  U
                </Avatar>
                <Typography
                  sx={{
                    marginLeft: '5px',
                    fontSize: '14px',
                  }}
                >
                  User 3
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Button
                size="small"
                sx={{
                  color: '#000',
                  border: ' 1px solid #000',
                  fontSize: '10px',
                  lineHeight: '1',
                  letterSpacing: '0.5px',
                  marginLeft: '15px',
                }}
              >
                View All +
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Typography
          sx={{
            marginLeft: '35px',
            marginTop: '15px',
            marginBottom: '1px',
            fontSize: '17px',
          }}
        >
          Additional Info:
        </Typography>
        <Typography
          sx={{
            marginLeft: '35px',
            fontSize: '14px',
          }}
        >
          -Please maintain decorum in the game and avoid use of foul
          language.
        </Typography>
        <Typography
          sx={{
            marginLeft: '35px',
            fontSize: '14px',
          }}
        >
          -This lobby is for Naruto fans who want to master their
          Jutsus.
        </Typography>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            marginY: '20px',
          }}
        >
          <Button
            sx={{
              color: '#8985F2',
              border: '1px solid  rgba(137, 133, 242, 0.85)',
              width: '30%',
              marginRight: '15px',
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              background:
                'linear-gradient(90deg, rgba(131, 85, 227, 0.85) 0%, rgba(137, 133, 242, 0.85) 100%)',
              color: '#fff',
              width: '30%',
              marginLeft: '15px',
            }}
          >
            Join Room
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
