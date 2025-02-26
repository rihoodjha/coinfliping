export function actionPayloadMessagesHaveLength(action) {
  return action !== undefined;
}

export function imageBelongsToPlayer(value, i, playerid) {
  return value[i].player.toString() === playerid.toString();
}

export function imageIsEqualToTails(value, i) {
  return value[i].image === "tails.jpg";
}

export function imageIsEqualToEmpty(value, i) {
  if (noMoreCoinsToFlip(value, i)) {
    return true;
  } else {
    return value[i].image === "empty.jpg";
  }
}

export function noMoreCoinsToFlip(value, i) {
  return i >= value.length;
}
