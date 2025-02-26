import React from "react";
import Player from "./Player";
import Typography from "@mui/material/Typography";
import RenderTimers from "./RenderTimers";

export function RenderPlayers(props) {
  const arr = props.players;

  const socket = props.socket;
  const players = arr.map(({ key, name, moved }) => {
    let goodname = ValidateName(name);
    return (
      <div key={key}>
        <Player
          socket={socket}
          id={key}
          player={goodname}
          timers={props.timers}
        />
      </div>
    );
  });

  return (
    <div>
      <Typography
        right="0"
        position="absolute"
        top
        variant="h5"
        component="div"
      >
        <RenderTimers socket={socket} timers={props.timers} />
      </Typography>

      {players}
    </div>
  );
}

function ValidateName(name) {
  let goodname = name;
  if (name.toString().indexOf(" ") === -1) {
    goodname =
      name.toString().slice(0, 1) + " " + name.toString().slice(1, name.length);
  }
  return goodname;
}
