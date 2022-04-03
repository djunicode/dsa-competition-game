import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="login" element={<><LoginScreen/></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
