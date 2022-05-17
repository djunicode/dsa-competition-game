import logo from './logo.svg';
import './App.css';
import SignupScreen from './screens/SignupScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
