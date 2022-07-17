import React, { useEffect, useState } from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PeopleIcon from '@mui/icons-material/People';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import copy from 'copy-to-clipboard';
import { MdContentCopy, MdPeopleAlt } from 'react-icons/md';
import { joinRoom, roomInfo } from '../actions/roomAction';
import { gameQuestions } from '../actions/gameActions';

const socket = io.connect('http://localhost:5000/');

export default function JoinRoomModal() {
  // const open = useSelector((state) => state.joinRoom);
  // const roomId = useSelector((state) => state.joinRoomCode);
  // const room = useSelector((state) => state.roomInfo);
  // const difficultyLevel = useSelector((state))
  // const admin = useSelector((state) => state.admin);
  const store = useSelector((state) => state);
  const {
    joinRoom: open,
    joinRoomCode: roomId,
    roomInfo: room,
    admin,
    userInfo: user,
  } = store;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.userInfo);
  const { _id } = user;

  useEffect(() => {
    if (open) {
      console.log(roomId);
      socket.emit('join_room', { userId: _id, roomId });

      socket.on('joinedLobby', (roomStatus) => {
        console.log('lobby call');
        if (roomStatus) {
          dispatch(roomInfo(roomStatus));
          console.log('user');
          console.log(room);
          // setRoomInfo(roomStatus);
        }
      });
    }
  }, [open]);
  console.log('inside join room');
  console.log(admin);
  console.log(room);
  const handleCancel = () => {
    socket.emit('leave_room');
    dispatch(joinRoom(false));
  };

  const copyToClipboard = () => {
    copy(roomId);
  };

  const handleStart = () => {
    socket.emit('start_game', { roomId });
    console.log('CLICKED');

    socket.on('gameQuestions', (questions) => {
      console.log('x', questions);
      // dispatch(gameQuestions(questions));
    });
    // navigate('/codeEditor');
  };

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
          height: 'auto',
          borderRadius: '15px',
          boxShadow: 'none',
        },
      }}
      maxWidth="sm"
    >
      <Box>
        <Box
          sx={{
            marginY: '25px',
            marginLeft: '35px',
            position: 'relative',
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              display: 'flex',
              height: '35px',
              width: '88%',
              borderRadius: '7px',
              backgroundColor: '#C4C2F5',
              border: '2.5px solid #8985F2',
              color: '#000',
              fontSize: '14.5px',
              paddingLeft: '12px',
              paddingTop: '4px',
              boxSizing: 'border-box',
            }}
          >
            {roomId}
            <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                right: '78px',
                bottom: '3px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton size="small" onClick={copyToClipboard}>
                <MdContentCopy />
              </IconButton>
            </Box>
          </Typography>
          {/* <IconButton
            sx={{
              display: 'flex',
              position: 'absolute',
              right: '18px',
              bottom: '-8px',
            }}
            onClick={handleCancel}
          >
            <CloseIcon fontSize="large" />
          </IconButton> */}
        </Box>
        <Typography
          variant="body1"
          component="text"
          align="left"
          sx={{
            marginTop: '35px',
            display: 'flex',
            paddingLeft: '38px',
            fontSize: '24px',
          }}
        >
          Host: {room.admin.adminName ? room.admin.adminName : ''}
        </Typography>
        <IconButton
          sx={{
            display: 'flex',
            position: 'absolute',
            right: '18px',
            top: '17px',
          }}
          onClick={handleCancel}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <Typography
          sx={{
            marginLeft: '35px',
            marginRight: '35px',
            marginTop: '14px',
            marginBottom: '25px',
            fontSize: '14px',
          }}
        >
          Additional Info: {room.additionalInfo}
        </Typography>
        <Box
          sx={{
            width: '100%',
            marginBottom: '8px',
            marginTop: '8px',
          }}
        >
          <Grid container rowSpacing={2}>
            <Grid item xs={3}>
              <Typography
                variant="body1"
                component="text"
                align="left"
                sx={{
                  paddingLeft: '35px',
                  fontSize: '20px',
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
                  paddingLeft: '48px',
                  fontSize: '20px',
                }}
              >
                Difficulty: {room.difficultyLevel}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="body1"
                component="text"
                sx={{
                  display: 'flex',
                  paddingLeft: '45px',
                  fontSize: '20px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '7px',
                  }}
                >
                  <PeopleIcon />
                </Box>
                {room.arrayOfUser.length}/{room.roomMaxLength}
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
          <Grid container rowSpacing={2} columnSpacing={3}>
            {room.arrayOfUser.map((player) => {
              return (
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      // alignItems: 'center',
                      // justifyContent: 'center',
                      paddingLeft: '35px',
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
                      {player.userName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      sx={{
                        marginLeft: '5px',
                        fontSize: '14px',
                      }}
                    >
                      {player.userName ? player.userName : ''}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        {admin ? (
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '20px',
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
              onClick={handleStart}
            >
              Start
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <Typography
              sx={{
                // marginLeft: '35px',
                // marginTop: '7px',
                // marginBottom: '2px',
                fontSize: '17.5px',
              }}
            >
              Waiting for admin to start...
            </Typography>
          </Box>
          /* <Box
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
              onClick={handleCancel}
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
          </Box> */
        )}
      </Box>
    </Dialog>
  );
}
