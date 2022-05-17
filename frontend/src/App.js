import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignupScreen from './screens/SignupScreen';
import LandingPage from './screens/LandingPage';
import TextEditor from './screens/TextEditor';
import CreateRoomModal from './components/CreateRoomModal';
import JoinRoomModal from './components/JoinRoomModal';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Link to="/signup">Signup page</Link>} />
            <Route path="signup" element={<SignupScreen />} />
            <Route exact path="/login" element={<><LoginScreen/></>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
