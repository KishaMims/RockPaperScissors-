import './App.css';
import Game from './components/game';
import Form from './components/loginform';
import Scoreboard from './components/scoreboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Form/>
      <Scoreboard/> */}
       <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
      <Scoreboard/>
    </div>
  );
}

export default App;
