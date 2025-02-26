import { isTheLastPlayer } from "./PlayerValidations";
import { allCoinsareflipped, firstValueDelivered } from "./CoinFlipValidation";
import { getGameSelected, getGameSelectedId } from "./QueryGameSelector";
import { getPlayerWaitingForGame } from "./QueryTimerSelector";
import {
  getFirstValueTimerSelected,
  getTimerSelectedFrom,
} from "./QueryTimerSelector";
import {
  SendStopGameTimer,
  SendFirstValue,
  SendPlayerStopped,
  SendPlayerStarted,
} from "./SendEvents";
export function SendPlayerTimerEvents(eventInformation, slices) {
  TryAndSendFirstValueAndLastPlayerEvents(eventInformation, slices);
  TryAndSendNotLastPlayer(eventInformation, slices);
}
export function SendPlayerStartedEvent(eventInformation, slices) {
  const gametypeid = getGameSelectedId(slices[1]);
  if (
    getPlayerWaitingForGame(slices[3], eventInformation[0], gametypeid) === 0
  ) {
    const name = slices[2].filter((x) => x.key === eventInformation[1])[0].name;

    SendPlayerStarted(eventInformation[2], [
      name,
      getTimerSelectedFrom(slices[3], eventInformation[1], gametypeid),
      eventInformation[0],
      gametypeid,
    ]);
  }
}
function TryAndSendFirstValueAndLastPlayerEvents(eventinformation, slices) {
  const LastGamePlayerId = 3;
  const id = eventinformation[0];
  const playerid = eventinformation[1];
  const socket = eventinformation[2];
  const gametypeid = getGameSelectedId(slices[1]);
  if (
    isTheLastPlayer(LastGamePlayerId, id) &&
    allCoinsareflipped(slices[0], playerid)
  ) {
    SendFirstValueAndLastPlayer(eventinformation, slices);
  } else {
    if (
      isTheLastPlayer(LastGamePlayerId, id) &&
      firstValueDelivered(getGameSelected(slices[1]), slices[0], playerid)
    ) {
      SendFirstValue(socket, [
        gametypeid,
        1,
        getFirstValueTimerSelected(slices[3], gametypeid),
        "First Value",
        0,
      ]);
    }
  }
}

function SendFirstValueAndLastPlayer(eventinformation, slices) {
  const id = eventinformation[0];
  const playerid = eventinformation[1];
  const socket = eventinformation[2];
  const player = slices[2];
  const name = player.filter((x) => x.key === playerid)[0].name;
  const gametypeid = getGameSelectedId(slices[1]);
  if (firstValueDelivered(getGameSelected(slices[1]), slices[0], playerid)) {
    SendFirstValue(socket, [
      gametypeid,
      1,
      getFirstValueTimerSelected(slices[3], gametypeid),
      "First Value",
      0,
    ]);
  }
  SendEventsForLastPlayer(socket, [
    name,
    getTimerSelectedFrom(slices[3], playerid, gametypeid),
    id,
    gametypeid,
  ]);
}

function TryAndSendNotLastPlayer(eventinformation, slices) {
  const id = eventinformation[0];
  const playerid = eventinformation[1];
  const socket = eventinformation[2];
  const name = slices[2].filter((x) => x.key === playerid)[0].name;
  const gametypeid = getGameSelectedId(slices[1]);
  const LastGamePlayerId = 3;
  if (!isTheLastPlayer(LastGamePlayerId, id)) {
    PlayerHasShippedAllCoins(socket, allCoinsareflipped(slices[0], id), [
      name,
      getTimerSelectedFrom(slices[3], playerid, gametypeid),
      id,
      gametypeid,
    ]);
  }
}

function SendEventsForLastPlayer(socket, timerselected) {
  SendStopGameTimer(socket);
  SendPlayerStopped(socket, timerselected);
}

function PlayerHasShippedAllCoins(socket, allcoinsflipped, timerselected) {
  if (allcoinsflipped) {
    SendPlayerStopped(socket, timerselected);
  }
}
