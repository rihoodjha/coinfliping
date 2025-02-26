import "./App.css";
import LoginForm from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GamePlayerManagementView from "./components/GamePlayerManagment";
import socketIO from "socket.io-client";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-B8NTEGT1LQ";
ReactGA.initialize(TRACKING_ID);
//const socket = socketIO.connect("http://localhost:4000");https://chatserver-mckewtoatq-ww.a.run.app

const socket = socketIO.connect("https://chatserver-mckewtoatq-ww.a.run.app");

function App() {
  return (
    <div>
      <GamePlayerManagementView socket={socket} />
      <Router>
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/login" element={<LoginForm id={0} socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
