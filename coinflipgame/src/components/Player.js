import Button from "@mui/material/Button";
import CoinImages from "./CoinImages";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectImage } from "../context/GameSlice";
import { selectAction } from "../context/ActionSlice";
import { getButtonDisabled } from "./CoinFlipValidation";
import React from "react";
import { selectGameType } from "../context/GameTypeSlice";
import Login from "./Login";
import { selectPlayersData } from "../context/PlayerSlice";
import { selectTimer } from "../context/TimerSlice";
import { MoveCoinImages } from "./MoveCoinImages";

export default function Player(props) {
  const action = useSelector(selectAction);
  const image = useSelector(selectImage);
  const gameTypeSelector = useSelector(selectGameType);
  const player = useSelector(selectPlayersData);
  const timer = useSelector(selectTimer);
  function moveTheFlippedCoinsClick(e) {
    MoveCoinImages(
      [Number(e.target.value), props.id, props.socket],
      [image, gameTypeSelector, player, timer]
    );
  }

  return (
    <div data-testid={props.player}>
      <Login id={props.id} socket={props.socket} />
      <Box
        width="50vw"
        alignItems={"left"}
        justify="left"
        sx={{
          flexGrow: 1,
          backgroundColor: "#918151",
          "&:hover": {
            backgroundColor: "#D2B48C",
            opacity: [0.9, 0.8, 0.7],
          },
          border: 4,
          borderColor: "primary.light",
        }}
      >
        <div data-testid="coinscontainer">
          <Grid
            container
            alignItems={"center"}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 0, md: 0 }}
          >
            <CoinImages
              socket={props.socket}
              id={props.id}
              player={props.player}
              timers={props.timers}
            />
          </Grid>
          <Button
            variant="contained"
            color="success"
            data-testid="shipthecoins"
            value={props.id}
            onClick={moveTheFlippedCoinsClick}
            name={"shipthecoins" + props.id}
            disabled={getButtonDisabled(action, props.id)}
          >
            Ship Coins
          </Button>
        </div>
      </Box>
    </div>
  );
}
