import React, { useState } from 'react'
import {Grid , Box , Button, TextField , Select , MenuItem} from '@mui/material'
import image from '../Images/image1.png'
import person from '../Images/Vector.png'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import person2 from '../Images/Vectorwhite.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Editor from "@monaco-editor/react";
const TextEditor = () => {
    const [userCode, setUserCode] = useState(``);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [play,setPlay] = useState(true);
    const [lang,setLang] = useState('');
    function compile() {
        setLoading(true);
        if (userCode === ``) {
          return;
        }
    }
    function clearOutput() {
        setUserOutput("");
    }
  return (
    <div style={{backgroundImage:`url(${image})` , backgroundSize:"cover" , color:"white" , marginTop:"2.5vh" , paddingBottom:"2.5vh"}}>
        <Grid container spacing={3}>
            <Grid item xs={12} spacing={3}>
                <Grid container>
                    <Grid item xs={2} sx={{marginTop:"2.5vh" , fontSize:"1.1rem"}}>Choose Language</Grid> 
                    <Grid item xs={2}>
                    <Select
                        name="Java" 
                        value={lang}
                        variant="outlined"
                        onChange={(e)=>setLang(e.target.value)}
                        style={{textAlign:"center", marginTop:"1.5vh" , marginLeft:"-12vh" ,color:"black" ,backgroundColor:"white",
                        width:"30vh",height:"6vh"}}
                        >
                        <MenuItem key="C" value="c"> C </MenuItem>
                        <MenuItem key="cpp" value="cpp"> C++ </MenuItem>
                        <MenuItem key="python" value="python">Python</MenuItem>
                        <MenuItem key="java" value="java">Java</MenuItem>
                    </Select>
                    </Grid>
                    <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={3}>
                            { play ? 
                            <><Button  sx={{fontSize:"1.1rem", color:"black" , fontWeight:"550" , backgroundColor:"white" , paddingTop:"-1vh" , paddingBottom:"-1vh" 
                            , paddingRight:"2vh" , paddingLeft:"2vh" , marginRight:"2vh"  ,marginTop:"1.5vh" ,width:"7rem",height:"6vh" }} 
                            onClick={() => {compile();setPlay(!play);}}><PlayArrowIcon /> Run </Button></> 
                            :<><Button  sx={{fontSize:"1.1rem", color:"black" , fontWeight:"550" , backgroundColor:"white" , paddingTop:"-1vh" , paddingBottom:"-1vh" 
                            , paddingRight:"2vh" , paddingLeft:"2vh" , marginRight:"2vh"  ,marginTop:"1.5vh" ,width:"7rem",height:"6vh" }} 
                            disabled ><PlayArrowIcon /> Run </Button>
                            </>
                            }
                        </Grid>
                        <Grid item xs={3}>
                            {play ? 
                            <><Button  sx={{fontSize:"1.1rem",fontWeight:"550" ,color:"black" , backgroundColor:"#ED6C63" , paddingTop:"-1vh" , paddingBottom:"-1vh" 
                            , paddingRight:"2vh" , paddingLeft:"2vh"  ,marginTop:"1.5vh" ,marginRight:"2vh" ,width:"7rem",height:"6vh"}} disabled onClick={() => {setPlay(!play);}}> 
                            <StopIcon style={{ color: "black"}}/>Stop</Button></>
                            :<><Button  sx={{fontSize:"1.1rem",fontWeight:"550" ,color:"black" , backgroundColor:"#ED6C63" , paddingTop:"-1vh" , paddingBottom:"-1vh" 
                            , paddingRight:"2vh" , paddingLeft:"2vh"  ,marginTop:"1.5vh" ,marginRight:"2vh" ,width:"7rem",height:"6vh"}} onClick={() => {setPlay(!play);}}> 
                            <StopIcon style={{ color: "black"}}/>Stop</Button>
                            </>
                            }
                        </Grid>
                        <Grid item xs={3}>
                        <Button  sx={{fontSize:"1.1rem", color:"white" ,fontWeight:"550" , backgroundColor:"#8985F2" , paddingTop:"-1vh" , paddingBottom:"-1vh" 
                        , paddingRight:"2vh" , paddingLeft:"2vh"  ,marginTop:"1.5vh" ,marginRight:"2vh" ,width:"7rem",height:"6vh"}}>Submit</Button><br/>
                        </Grid>
                        <Grid item xs={3} sx={{marginTop:"2.5vh" , fontSize:"1.1rem"}}>Timer</Grid>
                    </Grid>
                    </Grid>
                    <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={5}>
                            <AccountCircleIcon style={{width:"37px" , height:"37px" , marginLeft:"25vh" ,marginTop:"1.5vh", textAlign:"right"}}/>
                        </Grid>
                        <Grid item xs={7} sx={{marginTop:"1.5vh" , fontSize:"1.4rem" }}>Kush Maniar</Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
                <Editor
                    language={lang}
                    theme="vs-dark"
                    defaultLanguage="java"
                    defaultValue="# Enter your code here"
                    width="97%"
                    onChange={(value) => {
                    setUserCode(value);
                    }}
                />

                    {/*<Grid item xs={12} sx={{marginLeft:"-2vh"}}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={12}>Input</Grid>
                                    <Grid item xs={12}>
                                        <textarea
                                          style={{ fontSize: "2rem" , backgroundColor:"#1e1e1e" , color:"white" , width:"60vh"}}
                                          onChange={(e) => setUserInput(e.target.value)}
                                        ></textarea>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={12}>Output</Grid>
                                    <Grid item xs={12}>
                                        <Box
                                          sx={{ fontSize: "2rem" , backgroundColor:"#1e1e1e" , color:"white" , width:"60vh"}}
                                          onChange={(e) => setUserInput(e.target.value)}
                                        ></Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    */}
            
            </Grid>

            <Grid item xs={12} sm={4} md={4} spacing={3}  sx={{backgroundColor:"rgba(255, 255, 255, 0.1)" , marginTop:"2vh"}}>
                <Grid container>
                    <Grid item xs={12} padding={1} sx={{textAlign:"left" , fontSize:"1.05rem"}}>
                    Q1. You are in charge of the cake for a child's birthday. You have decided the cake will have one candle for each year of their total age. They will only be able to blow out the tallest of the candles. Count how many candles are tallest.
                    </Grid>
                    <Grid item xs={12} padding={1} sx={{textAlign:"left" , fontSize:"1.05rem"}}>
                    Example:<br/>
                    candles = [4,4,1,3]<br/>
                    The maximum height candles are 4 units high. There are 2 of them , so return 2.
                    </Grid>
                    <Grid item xs={12} padding={1} sx={{borderTop: "3px solid" , borderColor:"#6B6DCF" , marginTop:"3vh"}}></Grid>
                    <Grid item xs={12} padding={1} sx={{fontWeight:"550" ,fontSize:"1.2rem"  , textAlign:"left"}}>Input Format</Grid>
                    <Grid item xs={12} padding={1} sx={{textAlign:"left" , fontSize:"1.05rem"}}>
                    The first line contains a single integer n , the size of candles[].
                    The second line contains 'n' space-separated integers, where each integer i describes the height of candles[i].
                    </Grid>
                    <Grid item xs={12} padding={1} sx={{borderTop: "3px solid" , borderColor:"#6B6DCF" , marginTop:"3vh"}}></Grid>
                    <Grid item xs={12} padding={1} sx={{fontWeight:"550" ,fontSize:"1.2rem"  , textAlign:"left"}}>Sample Input</Grid>
                    <Box sx={{textAlign:"left"  , fontSize:"1.05rem" , padding:"1.1vh" , height:"1.2rem"}}>abc-000-xyz</Box>
                    <Grid item xs={12} padding={1} sx={{fontWeight:"550" ,fontSize:"1.2rem"  , textAlign:"left"}}>Sample Output</Grid>
                    <Box sx={{textAlign:"left"  , fontSize:"1.05rem" , padding:"1.1vh" , height:"1.2rem"}}>abc-000-xyz</Box>
                      
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

export default TextEditor