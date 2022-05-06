import React from 'react'
import {Grid , Box , Button} from '@mui/material'
import person from '../Images/Vectorwhite.png'
import image from '../Images/image2.png'
import profile from '../Images/profile.png'
const LandingPageLogin = () => {
  return (
    <div style={{backgroundImage:`url(${image})`}}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container padding={2}>
            <Grid item md={8} xs={4}></Grid>
            <Grid item md={3} xs={7}
             sx={{textAlign:"Right" , fontSize:"1.3rem" , fontWeight:"500" , color:"white" ,marginTop:"1.5vh"}}>
            <Grid container>
                <Grid item xs={5}>
                    <img src={profile} alt="profile" style={{width:"30px" , height:"30px"}} />
                </Grid>
                <Grid item xs={7}>Kush Maniar</Grid>
            </Grid>
            </Grid>
            <Grid item xs={1} ></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} 
        sx={{fontSize:"2rem" , marginBottom:"3vh" , fontWeight:"650" , color:"white"}}
        >Compete with friends and make coding fun</Grid>
        <Grid item xs={12} spacing={2}>
          <Grid container padding={5}>
            <Grid item xs={12} md={6} sm={6} 
            sx={{backgroundColor:"rgba(255, 255, 255, 0.1)"}}>
            <Grid conatiner padding={2} spacing={5}>
              <Grid item xs={12}
              sx={{fontSize:"1.3rem" , marginBottom:"3vh" ,marginTop:"3vh" , color:"white"}}>
              Host a game and invite your friends.
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={1} md={3} sm={3}></Grid>
                  <Grid item xs={10} md={6} sm={6}>
                    <Box sx={{backgroundColor:"#8985F2" , color:"white" , fontSize:"1.3rem" , padding:"1.1vh"}}>Create Room</Box>
                  </Grid>
                  <Grid item xs={1} md={3} sm={3}></Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container padding={3}>
                  <Grid item xs={5} sx={{borderTop: "3px solid" , borderColor:"white" , marginTop:"3vh"}}></Grid>
                    <Grid item xs={2}
                    sx={{color:"white" , fontSize:"1.2rem" , padding:"1.1vh"}}
                    >OR</Grid>
                  <Grid item xs={5} sx={{borderTop: "3px solid" , borderColor:"white" , marginTop:"3vh"}}></Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}
              sx={{fontSize:"1.3rem" , marginBottom:"3vh" , color:"white"}}>
              Enter a code below and join a room.
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={1} md={3} sm={3}></Grid>
                  <Grid item xs={10} md={6} sm={6}>
                    <Box sx={{backgroundColor:"white" ,textAlign:"left" , color:"#ABABAB" , fontSize:"1.1rem" , padding:"1.1vh"}}>abc-000-xyz</Box>
                  </Grid>
                  <Grid item xs={1} md={3} sm={3}></Grid>
                </Grid>
              </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <Grid conatiner padding={3}>
                <Grid item xs={12}
                sx={{fontSize:"1.5rem" , textAlign:"left" , fontWeight:"600" , marginBottom:"3vh" , color:"white"}}
                >Or, join a public game and fight for the top of he leaderboard.
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{border: "3px solid" , borderColor:"#8985F2"}}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container padding={2}>
                          <Grid item xs={4} 
                          sx={{textAlign:"left" , fontSize:"1.1rem" , color:"white" , fontWeight:"550"}}
                          >Public Room 1</Grid>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={3}
                          sx={{textAlign:"right" , fontSize:"1.1rem", color:"white" , fontWeight:"550"}}>79/100</Grid>
                          <Grid item xs={2}>
                            <img src={person} alt="person" style={{width:"30px" , height:"20px"}}/>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default LandingPageLogin