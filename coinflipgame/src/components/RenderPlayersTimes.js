import { selectPlayersData } from "../context/PlayerSlice";
import { useSelector } from "react-redux";
import { selectTimer } from "../context/TimerSlice";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { useEffect, useState } from "react";

export default function RenderGameTimer(props) {
  const timers = useSelector(selectTimer);
  const [playertimers, setPlayersTimers] = useState(
    timers.filter((x) => x.firstvalue === 0)
  );
  const players = useSelector(selectPlayersData);

  const socket = props.socket;

  useEffect(() => {
    socket.on("playertimeupdatedResponse", (data) => {
      setPlayersTimers(timers.filter((x) => x.player !== 0));
    });
    socket.on("timerresetResponse", (data) => {
      setPlayersTimers(timers.filter((x) => x.player !== 0));
    });
    socket.on("gametypeResponse", (data) => {
      setPlayersTimers(timers.filter((x) => x.player !== 0));
    });
  }, [socket, timers, playertimers]);

  //playertimeupdatedResponse
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: "lightgrey" }}>Name</TableCell>
          <TableCell sx={{ color: "lightgrey" }}>20 Coins</TableCell>
          <TableCell sx={{ color: "lightgrey" }}>10 Coins</TableCell>
          <TableCell sx={{ color: "lightgrey" }}>5 Coins</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {players.map(({ key, name }, id) => (
          <TableRow name={"shiptimeplayer1click" + key} key={id}>
            <TableCell>{name === "" ? "Player " + key : name}</TableCell>
            {playertimers
              .filter((x) => x.player === key)
              .map(({ player, id, timer, name, playing }, key) => (
                <TableCell key={key}>
                  {playing === 0 ? timer : "0:00"}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
