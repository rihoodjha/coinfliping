import React, { useState } from "react";
import { selectPlayersData } from "../context/PlayerSlice";
import { useSelector } from "react-redux";
import LogingForm from "./LogingForm";
import LoggedInForm from "./LoggedInForm";
import { SendUserLoggedIn } from "./SendEvents";
import Button from "@mui/material/Button";

export default function Login(props) {
  const socket = props.socket;
  const [players, setPlayersData] = useState([]);
  const playersData = useSelector(selectPlayersData);

  function onChange(e) {
    setPlayersData(e.target.value);
  }
  function loginClick(e) {
    SendUserLoggedIn(socket, {
      id: props.id,
      socket: socket.id,
      name: players,
    });
  }
  function renderButton() {
    if (
      playersData.filter((x) => x.key === props.id && x.name !== "").length ===
      0
    ) {
      return (
        <div>
          <Button
            name={"player" + props.id + "submit"}
            variant="contained"
            color="success"
            onClick={loginClick}
          >
            Update Player Name
          </Button>
        </div>
      );
    }
  }

  function renderName() {
    if (
      playersData.filter((x) => x.key === props.id && x.name !== "").length ===
      0
    ) {
      return (
        <LogingForm
          id={props.id}
          label={"Player " + props.id + " Name"}
          name={""}
          helperText="Type your name above"
          onChange={onChange}
        />
      );
    }

    return (
      <LoggedInForm
        id={props.id}
        label={"Player " + props.id + " Name"}
        name={playersData.filter((x) => x.key === props.id)[0].name}
        helperText="Type your name above"
        onChange={onChange}
      />
    );
  }

  return (
    <div>
      <div>{renderName()}</div>
      <div>{renderButton()}</div>
    </div>
  );
}
