export function getPlayers(playersData) {
  if (getNumberOfPlayersJoined(playersData) === 3) {
    return 0;
  } else {
    return playersData.filter((x) => x.socket === "")[0].key;
  }
}
export function getNumberOfPlayersJoined(playersData) {
  return playersData.filter((x) => x.socket !== "").length;
}
export function getThePlayerNameWith(playersData, playerid) {
  const player = playersData.find(
    (x) => x.key.toString() === playerid.toString()
  );
  return player;
}
