import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupScreen from './screens/SignupScreen';
import LandingPage from './screens/LandingPage';
import TextEditor from './screens/TextEditor';
import CreateRoomModal from './components/CreateRoomModal';
import JoinRoomModal from './components/JoinRoomModal';
import LoginScreen from './screens/LoginScreen';
import LeaderBoard from './screens/Leaderboard';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8985f2',
    },
    secondary: {
      main: '#ff4843',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { minWidth: 0 },
      },
    },
  },
});

function App() {
  const create = useSelector((state) => state.createRoom);
  const join = useSelector((state) => state.joinRoom);
  return (
    <ThemeProvider theme={lightTheme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div>
                    <Link to="/signup">Signup page</Link>
                  </div>
                  <div>
                    <Link to="/landingPage">Landing page</Link>
                  </div>
                  <div>
                    <Link to="/codeEditor">Code Editor page</Link>
                  </div>
                  <div>
                    <Link to="/login">Login page</Link>
                  </div>
                  <div>
                    <Link to="/leadeboard">Login page</Link>
                  </div>
                </>
              }
            />
            <Route path="signup" element={<SignupScreen />} />
            <Route
              path="landingPage"
              element={
                <>
                  <LandingPage />
                  {create && <CreateRoomModal />}
                  {join && <JoinRoomModal />}
                </>
              }
            />
            <Route path="codeEditor" element={<TextEditor />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            {/* <Route
              path="joinRoom"
              element={
                <>
                  <SignupScreen />
                  <JoinRoomModal />
                </>
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
