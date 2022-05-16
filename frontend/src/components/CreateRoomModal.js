import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import copy from 'copy-to-clipboard';
import { Dialog, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import PeopleIcon from '@mui/icons-material/People';
import Divider from '@mui/material/Divider';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MdContentCopy, MdPeopleAlt } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';

export default function CreateRoomModal() {
  const roomCode = 'https://gamelink.co.in/id#420?user/';
  const [open, setOpen] = useState(true);
  const [difficulty, setDifficulty] = useState('Intermediate');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      playersLimit: '',
      rounds: '',
      difficulty,
      timeLimit: '',
      additionalInfo: '',
    },
  });

  const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const copyToClipboard = () => {
    copy(roomCode);
  };

  const closeDialoge = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    setOpen(false);
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
          maxWidth: '42%',
          height: '60%',
          borderRadius: '15px',
          //   boxShadow: 'none',
        },
      }}
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
            {roomCode}
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
          <IconButton
            sx={{
              display: 'flex',
              position: 'absolute',
              right: '18px',
              bottom: '-8px',
            }}
            onClick={closeDialoge}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: '100%',
              marginBottom: '28px',
            }}
          >
            <Grid container rowSpacing={1}>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  component="text"
                  align="left"
                  sx={{
                    display: 'flex',
                    marginBottom: '13px',
                    paddingLeft: '35px',
                    fontSize: '18px',
                    lineHeight: '2',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      marginRight: '7px',
                      lineHeight: '16px',
                      fontSize: '30px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <MdPeopleAlt />
                  </Box>
                  Player Limit:
                  <Controller
                    name="playersLimit"
                    control={control}
                    rules={{
                      required: true,
                      pattern: /^[0-9]+$/,
                      min: 2,
                      max: 100,
                    }}
                    render={({ field }) => (
                      <TextField
                        id="playersLimit"
                        variant="outlined"
                        size="small"
                        sx={{
                          marginLeft: '5px',
                          width: '100px',
                        }}
                        error={errors.playersLimit}
                        // helperText={
                        //   errors.playersLimit
                        //     ? 'Enter valid number of players'
                        //     : ' '
                        // }
                        {...field}
                      />
                    )}
                  />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  component="text"
                  sx={{
                    display: 'flex',
                    paddingLeft: '80px',
                    fontSize: '18px',
                    lineHeight: '2',
                  }}
                >
                  Rounds
                  <Controller
                    name="rounds"
                    control={control}
                    rules={{
                      required: true,
                      pattern: /^[0-9]+$/,
                      min: 1,
                      max: 10,
                    }}
                    render={({ field }) => (
                      <TextField
                        id="rounds"
                        variant="outlined"
                        size="small"
                        sx={{
                          marginLeft: '40px',
                          width: '80px',
                        }}
                        error={errors.rounds}
                        // helperText={
                        //   errors.rounds
                        //     ? 'Enter valid number of rounds'
                        //     : ' '
                        // }
                        {...field}
                      />
                    )}
                  />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  component="text"
                  align="left"
                  sx={{
                    paddingLeft: '35px',
                    fontSize: '18px',
                    lineHeight: '2',
                    letterSpacing: '1.2px',
                  }}
                >
                  Difficulty:
                  <Controller
                    name="difficulty"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        id="difficulty"
                        value={difficulty}
                        onChange={handleDifficulty}
                        size="small"
                        sx={{
                          width: '150px',
                          marginLeft: '8px',
                        }}
                        {...field}
                      >
                        <MenuItem value="Easy">Easy</MenuItem>
                        <MenuItem value="Intermediate">
                          Intermediate
                        </MenuItem>
                        <MenuItem value="Hard">Hard</MenuItem>
                      </Select>
                    )}
                  />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  component="text"
                  sx={{
                    paddingLeft: '80px',
                    fontSize: '18px',
                    lineHeight: '2',
                  }}
                >
                  Time Limit
                  <Controller
                    name="timeLimit"
                    control={control}
                    rules={{
                      required: true,
                      pattern: /^[0-9]+$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        id="timeLimit"
                        variant="outlined"
                        size="small"
                        sx={{
                          marginLeft: '18px',
                          width: '80px',
                          marginRight: '5px',
                        }}
                        error={errors.timeLimit}
                        // helperText={
                        //   errors.timeLimit
                        //     ? 'Enter valid time limit'
                        //     : ' '
                        // }
                        {...field}
                      />
                    )}
                  />
                  (s)
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
              marginTop: '15px',
              marginBottom: '1px',
              fontSize: '18px',
            }}
          >
            Additional Info:
          </Typography>
          <Controller
            name="additionalInfo"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                id="additionalInfo"
                variant="outlined"
                multiline
                rows={2}
                sx={{
                  marginLeft: '35px',
                  width: '91%',
                }}
                inputProps={{ spellCheck: 'false' }}
                error={errors.additionalInfo}
                {...field}
              />
            )}
          />
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              marginY: '20px',
            }}
          >
            <Button
              type="submit"
              sx={{
                textTransform: 'none',
                fontSize: '23px',
                lineHeight: '32px',
                fontWeight: '600',
                background:
                  'linear-gradient(90deg, rgba(131, 85, 227, 0.85) 0%, rgba(137, 133, 242, 0.85) 100%)',
                color: '#fff',
                width: '50%',
                marginLeft: '10px',
                paddingLeft: '15px',
                borderRadius: '8px',
              }}
            >
              Invite your friends
              <Box
                sx={{
                  display: 'flex',
                  color: '#fff',
                  fontSize: '25px',
                  marginLeft: '10px',
                }}
              >
                <AiOutlineUserAdd />
              </Box>
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
}
