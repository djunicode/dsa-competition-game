import React, { useEffect, useState } from 'react';
import { Grid, Box, Button, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import Cookies from 'universal-cookie';

function LandingPage() {
  const all = [
    { id: 1, score: 78 },
    { id: 2, score: 88 },
    { id: 3, score: 98 },
    { id: 4, score: 70 },
  ];
  const [login, setLogin] = useState(true);

  const cookies = new Cookies();

  useEffect(() => {
    console.log(cookies.get('token'));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(/images/image2.png)`,
        backgroundSize: 'cover',
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} sx={{ height: '120px' }}>
          {login ? (
            <Grid container padding={2}>
              <Grid item md={8} xs={6} />
              <Grid
                item
                md={2}
                xs={3}
                sx={{
                  textAlign: 'Right',
                  fontSize: '1.3rem',
                  fontWeight: '500',
                  color: 'white',
                  marginTop: '1.1vh',
                }}
              >
                Guest
              </Grid>
              <Grid item md={2} xs={3}>
                <Button
                  sx={{
                    fontSize: '1.1rem',
                    color: 'white',
                    backgroundColor: '#8985F2',
                    paddingTop: '-1vh',
                    paddingBottom: '-1vh',
                    paddingRight: '2vh',
                    paddingLeft: '2vh',
                    marginTop: '0.5vh',
                  }}
                  onClick={() => setLogin(!login)}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container padding={2}>
              <Grid item md={8} xs={4} />
              <Grid
                item
                md={3}
                xs={7}
                sx={{
                  textAlign: 'Right',
                  fontSize: '1.3rem',
                  fontWeight: '500',
                  color: 'white',
                  marginTop: '1.2vh',
                }}
              >
                <Grid container>
                  <Grid item xs={5}>
                    <AccountCircleIcon
                      style={{
                        width: '37px',
                        height: '37px',
                        marginLeft: '25vh',
                      }}
                      onClick={() => setLogin(!login)}
                    />
                  </Grid>
                  <Grid item xs={7} sx={{ marginTop: '0.5vh' }}>
                    Kush Maniar
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            fontSize: '2rem',
            marginBottom: '3vh',
            fontWeight: '600',
            color: 'white',
          }}
        >
          Compete with friends and make coding fun
        </Grid>
        <Grid item xs={12} spacing={2}>
          <Grid container padding={5}>
            <Grid
              item
              xs={12}
              md={6}
              sm={6}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1) ',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Grid container padding={2} spacing={5}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    fontSize: '1.3rem',
                    marginTop: '6%',
                    marginBottom: '6%',
                    color: 'white',
                  }}
                >
                  Host a game and invite your friends.
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={1} md={3} sm={3} />
                    <Grid item xs={10} md={6} sm={6}>
                      <Box
                        sx={{
                          backgroundColor: login
                            ? '#4E4D62'
                            : '#8985F2',
                          color: 'white',
                          fontSize: '1.3rem',
                          padding: '1.1vh',
                          height: '2rem',
                        }}
                      >
                        {login ? (
                          <Button
                            disabled
                            sx={{
                              backgroundColor: login
                                ? '#4E4D62'
                                : '#8985F2',
                              color: 'white',
                              fontSize: '1.3rem',
                              height: '2rem',
                              padding: '1.1vh',
                            }}
                          >
                            Create Room
                          </Button>
                        ) : (
                          <Button
                            sx={{
                              backgroundColor: login
                                ? '#4E4D62'
                                : '#8985F2',
                              color: 'white',
                              fontSize: '1.3rem',
                              height: '2rem',
                              padding: '1.1vh',
                            }}
                          >
                            Create Room
                          </Button>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={1} md={3} sm={3} />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container padding={3}>
                    <Grid
                      item
                      xs={5}
                      sx={{
                        borderTop: '3px solid',
                        borderColor: 'white',
                        marginTop: '3vh',
                      }}
                    />
                    <Grid
                      item
                      xs={2}
                      sx={{
                        color: 'white',
                        fontSize: '1.2rem',
                        padding: '1.1vh',
                      }}
                    >
                      OR
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      sx={{
                        borderTop: '3px solid',
                        borderColor: 'white',
                        marginTop: '3vh',
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    fontSize: '1.3rem',
                    marginBottom: '3vh',
                    color: 'white',
                  }}
                >
                  Enter a code below and join a room.
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={1} md={3} sm={3} />
                    <Grid item xs={10} md={6} sm={6}>
                      <Grid
                        container
                        sx={{ backgroundColor: 'white' }}
                      >
                        <Grid item xs={10}>
                          <TextField
                            sx={{
                              textAlign: 'left',
                              color: '#ABABAB',
                              fontSize: '1.1rem',
                              padding: '1.1vh',
                              height: '1.2rem',
                            }}
                          >
                            abc-000-xyz
                          </TextField>
                        </Grid>
                        <Grid item xs={2}>
                          <ArrowForwardIosIcon
                            sx={{ paddingTop: '1vh' }}
                          />
                        </Grid>
                      </Grid>
                      {/* <Box sx={{backgroundColor:"white" ,textAlign:"left" , color:"#ABABAB" , fontSize:"1.1rem" , padding:"1.1vh"}}>abc-000-xyz
                    <ArrowForwardIosIcon sx={{marginLeft:"25vh" , paddingTop:"0.5vh"}}/></Box> */}
                    </Grid>
                    <Grid item xs={1} md={3} sm={3} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <Grid conatiner padding={3}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    fontSize: '1.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    marginBottom: '3vh',
                    color: 'white',
                  }}
                >
                  Or, join a public game and fight for the top of he
                  leaderboard.
                </Grid>
                <Grid item xs={12}>
                  {all.map((x, index) => {
                    return (
                      <Box
                        sx={{
                          border: '3px solid',
                          borderColor: '#8985F2',
                          marginBottom: '5px',
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid container padding={2}>
                              <Grid
                                item
                                xs={4}
                                sx={{
                                  textAlign: 'left',
                                  fontSize: '1.1rem',
                                  color: login
                                    ? '#FFFFFF26'
                                    : 'white',
                                  fontWeight: '550',
                                }}
                              >
                                Public Room {x.id}
                              </Grid>
                              <Grid item xs={3} />
                              <Grid
                                item
                                xs={3}
                                sx={{
                                  textAlign: 'right',
                                  fontSize: '1.1rem',
                                  color: login
                                    ? '#FFFFFF26'
                                    : 'white',
                                  fontWeight: '550',
                                }}
                              >
                                {x.score}/100
                              </Grid>
                              <Grid item xs={2}>
                                {login ? (
                                  <img
                                    // src="url(/images/Vector.png)"
                                    src="/images/Vector.png"
                                    alt="person"
                                    style={{
                                      width: '30px',
                                      height: '20px',
                                    }}
                                  />
                                ) : (
                                  <img
                                    // src="url(/images/Vectorwhite.png)"
                                    src="/images/Vectorwhite.png"
                                    alt="person"
                                    style={{
                                      width: '30px',
                                      height: '20px',
                                    }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
