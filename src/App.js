import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router,
  Route,
  Redirect,
  Switch
 } from 'react-router-dom';
import LandingPageLogin from './Components/LandiPageLogin';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
          <LandingPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
