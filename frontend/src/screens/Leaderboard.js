import React from 'react';
import { Grid, Typography, Card, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Leaderboard from '../images/leaderboard.png';

export default function LeaderBoard() {
  const Demo = [
    {
      name: 'Kush Maniar',
      number: '2931',
      id: 1,
    },
    {
      name: 'Sanika Ardekar',
      number: '567',
      id: 2,
    },
    {
      name: 'Kartik J',
      number: '6768',
      id: 3,
    },
    {
      name: 'Meet Patel',
      number: '4578',
      id: 4,
    },
  ];
  const useStyles = makeStyles(() => ({
    outerGrid: {
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${Leaderboard})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    },
    card: {
      background: 'rgba( 255, 255, 255, 0.25 )!important',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )!important',
      backdropFilter: 'blur( 3.5px )!important',
      border: '1px solid rgba( 255, 255, 255, 0.18 )!important',
      width: '75vw',
      //   height: '70vh',
      backgroundColor: 'none!important',
      borderRadius: '14px',
      // boxShadow: "none",
    },
    nameCard: {
      background: 'rgba( 74, 72, 72, 0.3 )!important',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )!important',
      backdropFilter: 'blur( 3.5px )!important',
      border: '1px solid rgba( 255, 255, 255, 0.18 )!important',
      width: '85vw',
      height: '70vh',
      backgroundColor: 'none!important',
      borderRadius: '14px',
    },
  }));

  const classes = useStyles();
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      className={classes.outerGrid}
    >
      <div>
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap={55}
        >
          <Typography
            style={{
              fontSize: '48px',
              lineHeight: '72px',
              color: 'white',
            }}
          >
            Leaderboard
          </Typography>
          <Typography
            style={{
              fontSize: '30px',
              lineHeight: '72px',
              color: 'white',
            }}
          >
            Global
          </Typography>
        </Grid>
        <Card sx={{ marginLeft: '20px' }} className={classes.card}>
          {Demo.map((card) => {
            return (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                key={card.id}
              >
                <Card
                  sx={{
                    display: 'flex',
                    width: '75vw',
                    height: '13vh',
                  }}
                  className={classes.nameCard}
                >
                  <Grid
                    item
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={2}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      // src=
                      sx={{
                        width: 49,
                        height: 49,
                        marginLeft: '10px',
                      }}
                    />
                    <Grid
                      item
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography>{card.name}</Typography>
                      <Typography>{card.number}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Card>
      </div>
    </Grid>
  );
}
