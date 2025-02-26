import React from "react";
import BoxOfCoins from "./Boxofcoins";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTimer } from "../context/TimerSlice";
import { addAction } from "../context/ActionSlice";
import { addCoins, shipAlltheCoinsForNexPlayer } from "../context/GameSlice";
import { addPlayer } from "../context/PlayerSlice";

export default function Home(props) {
  const socket = props.socket;
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("sendcoinResponse", (data) => {
      dispatch(
        shipAlltheCoinsForNexPlayer({
          player: data[0],
          numberofcoinsshipped: data[1],
          coinstoship: data[2],
        })
      );
    });
    socket.on("addnewplayerResponse", (data) => {
      dispatch(addPlayer());
      dispatch(addTimer());
      dispatch(addAction());
      dispatch(addCoins());
      socket.emit("playertimeupdated", data);
    });
  });
  return (
    <div>
      <BoxOfCoins socket={props.socket} id={50000} />
    </div>
  );
}
