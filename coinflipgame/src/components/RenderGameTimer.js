import React from "react";
import { useEffect, useState, useRef } from "react";
import { useStopwatch } from "react-timer-hook";
import { selectPlayersData } from "../context/PlayerSlice";
import { useSelector } from "react-redux";
import { SendSyncGameTimer, SendUpdatePlayerTimes } from "./SendEvents";
import {
  setTimerBox,
  selectTimer,
  setFirstValueTimer,
} from "../context/TimerSlice";
import { useDispatch } from "react-redux";
import { CalculateDeliveryTime } from "./CalculateDeliveryTime";
export default function RenderGameTimer(props) {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayersData);
  const timers = useSelector(selectTimer);
  const lastplayersocket = players.filter((x) => x.key === 3).socket;
  const socket = props.socket;
  let { seconds, minutes, start, pause, isRunning, reset } = useStopwatch({
    autoStart: false,
  });
  const valueref = useRef("0:00");
  const gametime =
    seconds < 10
      ? minutes + ":0" + seconds
      : seconds === 10
      ? minutes + ":10"
      : minutes + ":" + seconds;
  const [usegametimer, setUseGameTimer] = useState(false);
  const [gametimer, setGameTimer] = useState("");

  useEffect(() => {
    valueref.current = gametime;
    socket.on("starttimerResponse", (data) => {
      if (gametimerneedstostart(isRunning, data)) {
        setUseGameTimer(false);
        reset();
        start();
      }
    });
    socket.on("finaltimerResponse", (data) => {
      const newdata = [
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        valueref.current,
      ];
      dispatch(setFirstValueTimer({ timer: newdata }));
    });
    socket.on("playerstartedResponse", (data) => {
      const newstartdata = [
        data[0],
        valueref.current,
        data[1],
        data[2],
        1,
        data[3],
      ];
      dispatch(setTimerBox({ timer: newstartdata }));
    });

    socket.on("playerstoppedResponse", (data) => {
      const playerstarttime = timers.filter(
        (x) => x.player === data[2] && x.gametypeid === data[3]
      )[0].timer;
      if (playerstarttime !== "0:00") {
        dispatch(
          setTimerBox({
            timer: [
              data[0],
              CalculateDeliveryTime(valueref.current, playerstarttime),
              data[1],
              data[2],
              0,
            ],
          })
        );
      } else {
        dispatch(
          setTimerBox({
            timer: [data[0], valueref.current, data[1], data[2], 0],
          })
        );
      }
      SendUpdatePlayerTimes(socket, data);
    });

    socket.on("stoptimerResponse", (data) => {
      if (isRunning) {
        pause();
      }
      SendSyncGameTimer(socket, [lastplayersocket, valueref.current]);
    });

    socket.on("syncgametimerResponse", (data) => {
      setUseGameTimer(true);
      setGameTimer(data);
    });

    socket.on("gametypeResponse", (data) => {
      reset();
      pause();
    });

    socket.on("timerresetResponse", (data) => {
      if (data.toString().includes("reset")) {
        reset();
        pause();
      }
    });
  }, [
    start,
    reset,
    socket,
    pause,
    isRunning,
    lastplayersocket,
    usegametimer,
    gametime,
    dispatch,
    timers,
    gametimer,
  ]);

  return (
    <div key={1}>
      Game Timer:{" "}
      <span name={"gameminutes"}>{usegametimer ? gametimer : gametime}</span>
    </div>
  );
}

function gametimerneedstostart(isRunning, data) {
  return !isRunning && data[0] && data[1];
}
