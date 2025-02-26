import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPlayersData } from "../context/PlayerSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function GamePlayerManagementView(props) {
  const socket = props.socket;
  socket.setKeepAlive = true;
  const players = useSelector(selectPlayersData);
  const [joined, setJoin] = useState(
    "You have not joined the game please press F5 to join the game."
  );
  useEffect(() => {
    socket.on("connect", () => {
      setJoin("You have joined the game! Welcome to the coin flip exercise!");
    });
  });
  function resetTheGame() {
    socket.emit("resetthegame", "reset");
  }

  function addnewplayer() {
    socket.emit("addnewplayer", players.length);
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              name="connectedtogamemessage"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <p>{joined}</p>
            </Typography>
            <Button
              name="addPlayer"
              color="inherit"
              sx={{ display: "none" }}
              onClick={addnewplayer}
            >
              Add Players
            </Button>
            <Button name="resetTheGame" color="inherit" onClick={resetTheGame}>
              Reset Game
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
