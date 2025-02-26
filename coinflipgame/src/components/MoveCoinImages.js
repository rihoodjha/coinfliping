import { SendPlayerTimerEvents } from "./SendPlayerTimerEvents";
import { correctNumberOfCoinsareflipped } from "./CoinFlipValidation";
import { getGameSelected } from "./QueryGameSelector";
import { SendCoinEvent } from "./SendEvents";

export function MoveCoinImages(eventInformation, slices) {
  const target = eventInformation[0];
  const playerid = eventInformation[1];
  const socket = eventInformation[2];

  if (
    correctNumberOfCoinsareflipped(
      getGameSelected(slices[1]),
      slices[0],
      playerid
    )
  ) {
    SendCoinEvent(socket, [
      target,
      getGameSelected(slices[1]),
      slices[0].filter(
        (x) =>
          x.beenflipped === true &&
          x.beenshipped === false &&
          x.player === playerid
      ),
    ]);
    SendPlayerTimerEvents(
      [Number(target), playerid, socket],
      [slices[0], slices[1], slices[2], slices[3]]
    );
  }
}
