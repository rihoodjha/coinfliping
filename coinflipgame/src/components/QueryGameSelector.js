export function getGameSelected(selections) {
  let gameselected = 20;
  if (selections !== undefined && selections.length > 0) {
    gameselected = selections.filter((x) => x.selected)[0].game;
  }
  return gameselected;
}
export function getGameSelectedId(selections) {
  let gameselected = 20;
  if (selections !== undefined && selections.length > 0) {
    gameselected = selections.filter((x) => x.selected)[0].id;
  }
  return gameselected;
}
