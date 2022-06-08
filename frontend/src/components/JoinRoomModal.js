import React from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PeopleIcon from '@mui/icons-material/People';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { BsPersonCircle } from 'react-icons/bs';
import { FaChevronRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { joinRoom } from '../actions/roomAction';

export default function JoinRoomModal() {
  // Dummy Participants
  const players = ['User 1', 'Player 2', 'Player 3'];
  const open = useSelector((state) => state.joinRoom);
  const dispatch = useDispatch();
  return (
    <Dialog
      open={open}
      BackdropProps={{ style: { backgroundColor: 'unset' } }}
      sx={{
        backdropFilter: 'blur(10px)',
      }}
      PaperProps={{
        sx: {
          width: '37%',
          height: '58%',
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
                  fontSize: '18px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '7px',
                    paddingBottom: '3px',
                    fontSize: '22px',
                  }}
                >
                  <BsPersonCircle />
                </Box>
                Host: Meet Patel
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                component="text"
                sx={{
                  display: 'flex',
                  paddingLeft: '150px',
                  fontSize: '17.5px',
                }}
              >
                7/10
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '7px',
                  }}
                >
                  <PeopleIcon />
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                component="text"
                align="left"
                sx={{
                  paddingLeft: '60px',
                  fontSize: '17.5px',
                }}
              >
                Rounds: 10
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                component="text"
                sx={{
                  paddingLeft: '100px',
                  fontSize: '17.5px',
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
            marginTop: '7px',
            marginBottom: '2px',
            fontSize: '17.5px',
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
            {players.map((player) => {
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
                        fontWeight: '300',
                        bgcolor: '#7879F1',
                        color: '#000000',
                        border: '1.22890px solid #000',
                        height: '20.91px',
                        width: '20.91px',
                        lineHeight: '33px',
                        boxSizing: 'border-box',
                        paddingX: '1px',
                      }}
                    >
                      {player.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      sx={{
                        marginLeft: '5px',
                        fontSize: '14px',
                      }}
                    >
                      {player}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
            <Grid item xs={3}>
              <Button
                size="small"
                sx={{
                  textTransform: 'none',
                  width: '60%',
                  color: '#000',
                  border: ' 1px solid #000',
                  fontSize: '12px',
                  lineHeight: '12px',
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
            fontSize: '17.5px',
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
              textTransform: 'none',
              fontSize: '17px',
              lineHeight: '22px',
              color: '#8985F2',
              border: '1px solid ',
              fontWeight: '600',
              borderColor:
                'linear-gradient(90deg, #AF49FF 90%, #8985F2 100%)',
              width: '30%',
              marginRight: '15px',
              borderRadius: '5px',
            }}
            onClick={() => dispatch(joinRoom(false))}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: 'none',
              fontSize: '17px',
              lineHeight: '22px',
              fontWeight: '600',
              background:
                'linear-gradient(90deg, rgba(131, 85, 227, 0.85) 0%, rgba(137, 133, 242, 0.85) 100%)',
              color: '#fff',
              width: '28%',
              marginLeft: '15px',
              paddingLeft: '15px',
              borderRadius: '5px',
            }}
          >
            Join Room
            <Box
              sx={{
                display: 'flex',
                color: 'rgba(69, 68, 135, 0.99)',
                fontSize: '20px',
                marginLeft: '10px',
              }}
            >
              <FaChevronRight />
            </Box>
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
