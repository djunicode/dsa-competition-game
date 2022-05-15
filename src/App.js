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
import TextEditor from './Components/TextEditor';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/landingpage" exact>
          <LandingPage/>
          </Route>
          <Route path="/codeeditor" exact>
          <TextEditor/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
