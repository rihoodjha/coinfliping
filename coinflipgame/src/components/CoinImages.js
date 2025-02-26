import { useSelector } from "react-redux";
import { selectImage } from "../context/GameSlice";
import { Grid } from "@mui/material";
import CoinGrid from "./CoinGrid";
import { SendPlayerStartedEvent } from "./SendPlayerTimerEvents";
import {
  TryToSendGameTimerMessage,
  TryAndSendCoinFlipMessage,
  SendActionEvent,
} from "./SendEvents";
import {
  correctNumberOfCoinsareflipped,
  coinImageIsNotEmptyJPG,
  returnCorrectImageFromData,
  nameIsNotEmptyOrUndefined,
} from "./CoinFlipValidation";
import { getGameSelected } from "./QueryGameSelector";
import { selectGameType } from "../context/GameTypeSlice";
import { selectPlayersData } from "../context/PlayerSlice";
import { selectTimer } from "../context/TimerSlice";
export default function CoinImages(props) {
  const gameTypeSelector = useSelector(selectGameType);
  const image = useSelector(selectImage);
  const player = useSelector(selectPlayersData);
  const name = player.filter((x) => x.key === props.id)[0].name;
  const FirstGamePlayerId = 1;

  const timer = useSelector(selectTimer);
  function enableShipButton() {
    SendActionEvent(props.socket, [
      correctNumberOfCoinsareflipped(
        getGameSelected(gameTypeSelector),
        image,
        props.id
      ),
      [props.id, 0],
    ]);
  }

  function SendPlayerStarted() {
    SendPlayerStartedEvent(
      [props.id, props.id, props.socket],
      [image, gameTypeSelector, player, timer]
    );
  }
  function flipTheCoin(e) {
    if (CoinShouldBeFlipped(e)) {
      const id = Number(e.target.alt);

      if (id > 0) {
        SendPlayerStarted();
        TryAndSendCoinFlipMessage(props.socket, id);
        TryToSendGameTimerMessage(props.socket, [
          FirstGamePlayerId,
          image.filter((x) => x.player === props.id && x.beenflipped === true)
            .length === 0,
          props.id,
        ]);
      }
    }
  }

  function CoinShouldBeFlipped(e) {
    return (
      nameIsNotEmptyOrUndefined(name) &&
      coinImageIsNotEmptyJPG(e.target.src) &&
      !correctNumberOfCoinsareflipped(
        getGameSelected(gameTypeSelector),
        image,
        props.id
      )
    );
  }
  enableShipButton();
  return image
    .filter((x) => x.player === props.id)
    .map((coin, index) => {
      return (
        <Grid item xs={0} key={coin.id}>
          <CoinGrid
            flipthecoin={flipTheCoin}
            id={props.id}
            coin={coin.id}
            moved={returnCorrectImageFromData(coin)}
            background={coin.background}
            player={coin.player}
            tennessee={true}
          />
        </Grid>
      );
    });
}
