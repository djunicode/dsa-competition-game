import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignupScreen from './screens/SignupScreen';
import LandingPage from './screens/LandingPage';
import TextEditor from './screens/TextEditor';
import CreateRoomModal from './components/CreateRoomModal';
import JoinRoomModal from './components/JoinRoomModal';

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
                    <CreateRoomModal />
                  </div>
                  <div>{/* <JoinRoomModal /> */}</div>
                </>
              }
            />
            <Route path="signup" element={<SignupScreen />} />
            <Route path="landingPage" element={<LandingPage />} />
            <Route path="codeEditor" element={<TextEditor />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
