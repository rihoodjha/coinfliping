export function getTimerSelected(timer, playerid) {
  let id = 1;
  if (timer !== undefined && timer.length > 0) {
    id = timer.filter((x) => x.player === playerid)[0].id;
  }
  return id;
}
export function getTimerSelectedFrom(timer, playerid, gametypeid) {
  let id = 1;
  if (timer !== undefined && timer.length > 0) {
    id = timer.filter(
      (x) => x.player === playerid && x.gametypeid === gametypeid
    )[0].id;
  }
  return id;
}
export function getFirstValueTimerSelected(timer, gametypeid) {
  let id = 1;
  if (timer !== undefined && timer.length > 0) {
    id = timer.filter(
      (x) => x.gametypeid === gametypeid && x.firstvalue === 1
    )[0].id;
  }
  return id;
}
export function getPlayerWaiting(timer, playerid) {
  return timer.filter((x) => x.player === playerid)[0].playing;
}

export function getPlayerWaitingForGame(timer, playerid, gametypeid) {
  return timer.filter(
    (x) => x.player === playerid && x.gametypeid === gametypeid
  )[0].playing;
}
export function getTheNameForThe(player, playerid) {
  const playername =
    player === undefined
      ? "First Value"
      : player.name === ""
      ? "Player " + playerid.toString()
      : player.name;
  return playername;
}
