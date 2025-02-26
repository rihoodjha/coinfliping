import { messagesAreNotBlankOrEmpty } from "../context/MessageValidation";

export function correctNumberOfCoinsareflipped(CoinedFlippedLimit, coins, id) {
  if (getAllCoinsForPlayer(coins, id).length === CoinedFlippedLimit) {
    return true;
  }
  return false;
}

function getAllCoinsForPlayer(coins, id) {
  return coins.filter(
    (x) => x.player === id && x.beenflipped === true && x.beenshipped === false
  );
}

export function nameIsNotEmptyOrUndefined(playerName) {
  return playerName !== "";
}
export function allCoinsareflipped(image, id) {
  return (
    image.filter((x) => x.player === id && x.beenflipped === false).length === 0
  );
}

export function coinIsTheCoin1AndImageIsHeads(coinid, imagegiven) {
  return coinid === 1 && coinImageIsHeadsJPG(imagegiven);
}

export function coinIsTheCoin21AndImageIsEmpty(coinid, imagegiven) {
  return coinid === 21 && coinImageIsEmptyJPG(imagegiven);
}

export function coinIsTheCoin41AndImageIsEmpty(coinid, imagegiven) {
  return coinid === 41 && coinImageIsEmptyJPG(imagegiven);
}

export function doesTheMessageContainTheCoinId(messages, coinid) {
  return messages.filter((x) => x.toString() === coinid.toString()).length > 0;
}

export function coinImageIsEmptyJPG(imagegiven) {
  return imagegiven === undefined
    ? false
    : imagegiven.toString().includes("empty.jpg");
}

export function coinImageIsNotEmptyJPG(imagegiven) {
  return imagegiven === undefined
    ? false
    : !imagegiven.toString().includes("empty.jpg");
}

export function coinImageIsHeadsJPG(imagegiven) {
  return imagegiven.toString().includes("heads.jpg");
}
export function returnCorrectImageFrom(event, playerid, coinid) {
  if (event === "coinstarted" && playerid === 1) {
    return "heads.jpg";
  } else {
    if (event === "coinflipped") {
      return "tails.jpg";
    }
    if (event === "coindelivered") {
      return "heads.jpg";
    }
    if (event === "coinshipped") {
      return "empty.jpg";
    }
    return "empty.jpg";
  }
}

export function returnCorrectImageFromData(coin) {
  if (coin.player === 1) {
    return returnPlayer1Image(coin);
  }

  if (coin.beenflipped && coin.beenshipped) {
    return "empty.jpg";
  }

  if (coin.beenflipped && coin.beendelivered) {
    return "tails.jpg";
  }

  if (coin.beendelivered) {
    return "heads.jpg";
  }

  return coin.image;
}

function returnPlayer1Image(coin) {
  if (coin.player === 1 && itIsANewGame(coin)) {
    return "heads.jpg";
  }

  if (coin.beenflipped && coin.beenshipped) {
    return "empty.jpg";
  }

  if (coin.player === 1 && coin.beenflipped) {
    return "tails.jpg";
  }

  return coin.image;
}

function itIsANewGame(coin) {
  return !coin.beenflipped && !coin.beenshipped && !coin.beendelivered;
}

export function returnCorrectImage(messages, coinid, imagegiven) {
  // coin started and player 1 = heads else empty
  // coin flipped tails
  // coin delivered heads
  // coin shipped empty
  if (coinImageIsEmptyJPG(imagegiven)) {
    return imagegiven;
  }
  const theCoinIdIsInTheMessage = doesTheMessageContainTheCoinId(
    messages,
    coinid
  );

  if (messagesAreNotBlankOrEmpty(messages) && theCoinIdIsInTheMessage) {
    return "tails.jpg";
  } else {
    return imagegiven;
  }
}

export function returnCorrectBackGround(imagegiven) {
  if (ImageIsTailsJPG(imagegiven)) {
    return true;
  } else {
    return false;
  }
}

function ImageIsTailsJPG(imagegiven) {
  return imagegiven === "tails.jpg";
}

export function getButtonDisabled(actiondata, id) {
  return actiondata.filter((x) => x.player === id)[0].disabled === 1;
}
export function firstValueDelivered(CoinedFlippedLimit, coins, id) {
  if (id !== 3) {
    return false;
  }
  return (
    getNumberOfCoinsFlippedForPlayer(coins, id).length === CoinedFlippedLimit
  );
}
function getNumberOfCoinsFlippedForPlayer(coins, id) {
  return coins.filter((x) => x.player === id && x.beenflipped === true);
}
