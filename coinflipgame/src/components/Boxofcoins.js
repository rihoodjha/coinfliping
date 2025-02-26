import { useEffect, useState } from "react";
import { RenderPlayers } from "./RenderPlayers";
import { useDispatch } from "react-redux";
import { flipCoin, resetCoins } from "../context/GameSlice";
import { setGameTypeData } from "../context/GameTypeSlice";
import { setTimerPlayerName } from "../context/TimerSlice";
import { setAction } from "../context/ActionSlice";
import { setResetTime } from "../context/ResetSlice";
import { TabsforGameSelector } from "./TabsforGameSelector";
import { setPlayerData, selectPlayersData } from "../context/PlayerSlice";
import { useSelector } from "react-redux";
import { SendUserLoggedIn } from "./SendEvents";

export default function BoxOfCoins(props) {
  const playersData = useSelector(selectPlayersData);
  const [timers, setTimers] = useState([]);
  const [gametype, setGameType] = useState([]);
  const socket = props.socket;
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      if (data.toString().includes("reset")) {
        dispatch(
          resetCoins({
            data: data,
          })
        );
      } else {
        dispatch(
          flipCoin({
            data: data,
          })
        );
      }
    });
    socket.on("timerresetResponse", (data) => {
      if (data.toString().includes("reset")) {
        setTimers([]);
        dispatch(setResetTime({ reset: data.toString().includes("reset") }));
      }
    });

    socket.on("gametypeResponse", (data) => {
      setGameType([gametype, data]);
      dispatch(setGameTypeData({ gametype: data }));
    });
    socket.on("resetthegameResponse", (data) => {
      window.location.reload(true);
    });
    socket.on("playerResponse", (data) => {
      if (data !== undefined) {
        dispatch(setPlayerData({ player: data }));
        dispatch(setTimerPlayerName({ player: data }));
      }
    });
    socket.on("actionResponse", (data) => {
      dispatch(setAction({ disable: data }));
    });
    socket.on("playerconnected", (data) => {
      if (playersData.filter((x) => x.socket === socket.id).length > 0) {
        let player = playersData.filter((x) => x.socket === socket.id);
        SendUserLoggedIn(socket, {
          id: player[0].key,
          socket: player[0].socket,
          name: player[0].name,
        });
      }
    });
  }, [playersData, socket, gametype, timers, dispatch]);

  return (
    <div key={props.id}>
      <TabsforGameSelector socket={socket} />
      <RenderPlayers players={playersData} socket={socket} timers={timers} />
    </div>
  );
}
