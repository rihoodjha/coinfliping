import {
  correctNumberOfCoinsareflipped,
  allCoinsareflipped,
  coinImageIsEmptyJPG,
  coinImageIsNotEmptyJPG,
  doesTheMessageContainTheCoinId,
  returnCorrectImage,
  returnCorrectImageFrom,
  returnCorrectImageFromData,
  returnCorrectBackGround,
  nameIsNotEmptyOrUndefined,
  coinImageIsHeadsJPG,
  firstValueDelivered,
  getButtonDisabled,
  coinIsTheCoin1AndImageIsHeads,
  coinIsTheCoin21AndImageIsEmpty,
  coinIsTheCoin41AndImageIsEmpty,
} from "./CoinFlipValidation";

test("should return heads when event is coin started and player is 1 and coinid is 1", () => {
  expect(returnCorrectImageFrom("coinstarted", 1, 1)).toBe("heads.jpg");
});

test("should return empty when event is coin started and player is 2 and coinid is 21", () => {
  expect(returnCorrectImageFrom("coinstarted", 2, 21)).toBe("empty.jpg");
});

test("should return empty when event is coin started and player is 3 and coinid is 41", () => {
  expect(returnCorrectImageFrom("coinstarted", 3, 41)).toBe("empty.jpg");
});

test("should return empty when event is coin flipped and player is 1 and coinid is 1", () => {
  expect(returnCorrectImageFrom("coinflipped", 1, 1)).toBe("tails.jpg");
});

test("should return empty when event is coin delivered and player is 2 and coinid is 21", () => {
  expect(returnCorrectImageFrom("coindelivered", 2, 21)).toBe("heads.jpg");
});

test("should return empty when event is coin shipped and player is 2 and coinid is 21", () => {
  expect(returnCorrectImageFrom("coinshipped", 2, 21)).toBe("empty.jpg");
});

test("should return empty when player is 3 and coin has not been flipped, shipped or deliver", () => {
  const image = {
    player: 3,
    id: 41,
    image: "empty.jpg",
    background: false,
    beenflipped: false,
    beenshipped: false,
    beendelivered: false,
  };
  expect(returnCorrectImageFromData(image)).toBe("empty.jpg");
});

test("should return heads when player is 3 and coin has been delivered", () => {
  const image = {
    player: 3,
    id: 41,
    image: "empty.jpg",
    background: false,
    beenflipped: false,
    beenshipped: false,
    beendelivered: true,
  };
  expect(returnCorrectImageFromData(image)).toBe("heads.jpg");
});

test("should return heads when player is 3 and coin has been delivered coin id 42", () => {
  const image = {
    player: 3,
    id: 42,
    image: "empty.jpg",
    background: false,
    beenflipped: false,
    beenshipped: false,
    beendelivered: true,
  };
  expect(returnCorrectImageFromData(image)).toBe("heads.jpg");
});

test("should return tails when player is 3 and coin has been delivered and flipped", () => {
  const image = {
    player: 3,
    id: 41,
    image: "empty.jpg",
    background: false,
    beenflipped: true,
    beenshipped: false,
    beendelivered: true,
  };
  expect(returnCorrectImageFromData(image)).toBe("tails.jpg");
});

test("should return empty when player is 3 and coin has been delivered and flipped and shipped", () => {
  const image = {
    player: 3,
    id: 41,
    image: "empty.jpg",
    background: false,
    beenflipped: true,
    beenshipped: true,
    beendelivered: true,
  };
  expect(returnCorrectImageFromData(image)).toBe("empty.jpg");
});

test("should return empty when player is 2 and coin has been delivered and flipped and shipped", () => {
  const image = {
    player: 2,
    id: 21,
    image: "empty.jpg",
    background: false,
    beenflipped: true,
    beenshipped: true,
    beendelivered: true,
  };
  expect(returnCorrectImageFromData(image)).toBe("empty.jpg");
});

test("should return heads when player is 1 and coin has not been delivered and flipped and shipped", () => {
  const image = {
    player: 1,
    id: 1,
    image: "empty.jpg",
    background: false,
    beenflipped: false,
    beenshipped: false,
    beendelivered: false,
  };
  expect(returnCorrectImageFromData(image)).toBe("heads.jpg");
});

test("should return tails when player is 1 and coin has been flipped but not been delivered and shipped", () => {
  const image = {
    player: 1,
    id: 1,
    image: "empty.jpg",
    background: false,
    beenflipped: true,
    beenshipped: false,
    beendelivered: false,
  };
  expect(returnCorrectImageFromData(image)).toBe("tails.jpg");
});

test("should return empty when player is 1 and coin has been flipped and shipped but not been delivered", () => {
  const image = {
    player: 1,
    id: 1,
    image: "empty.jpg",
    background: false,
    beenflipped: true,
    beenshipped: true,
    beendelivered: false,
  };
  expect(returnCorrectImageFromData(image)).toBe("empty.jpg");
});

test("should return true when button is enabled", () => {
  const ActionData = [
    {
      player: 1,
      id: 1,
      disabled: 0,
    },
    {
      player: 2,
      id: 2,
      disabled: 1,
    },
    {
      player: 3,
      id: 3,
      disabled: 1,
    },
  ];
  expect(getButtonDisabled(ActionData, 1)).toBe(false);
});
test("should return false when button is disabled", () => {
  const ActionData = [
    {
      player: 1,
      id: 1,
      disabled: 0,
    },
    {
      player: 2,
      id: 2,
      disabled: 1,
    },
    {
      player: 3,
      id: 3,
      disabled: 1,
    },
  ];
  expect(getButtonDisabled(ActionData, 2)).toBe(true);
});

test("should return false if coin image is not empty", () => {
  const validCoinsImage = coinImageIsEmptyJPG("tails.jpg");
  expect(validCoinsImage).toBe(false);
});

test("should return true if coin image is not empty", () => {
  const validCoinsImage = coinImageIsNotEmptyJPG("tails.jpg");
  expect(validCoinsImage).toBe(true);
});

test("should return false if coin image is undefined", () => {
  const validCoinsImage = coinImageIsEmptyJPG(undefined);
  expect(validCoinsImage).toBe(false);
});

test("should return true if the coin is 1 and image is heads", () => {
  const coin1 = coinIsTheCoin1AndImageIsHeads(1, "heads.jpg");
  expect(coin1).toBe(true);
});

test("should return false if the coin is 2 and image is heads", () => {
  const coin1 = coinIsTheCoin1AndImageIsHeads(2, "heads.jpg");
  expect(coin1).toBe(false);
});

test("should return false if the coin is 1 and image is false", () => {
  const coin1 = coinIsTheCoin1AndImageIsHeads(1, "tails.jpg");
  expect(coin1).toBe(false);
});

test("should return true if the coin is 21 and image is heads", () => {
  const coin1 = coinIsTheCoin21AndImageIsEmpty(21, "heads.jpg");
  expect(coin1).toBe(false);
});

test("should return false if the coin is 22 and image is heads", () => {
  const coin1 = coinIsTheCoin21AndImageIsEmpty(22, "heads.jpg");
  expect(coin1).toBe(false);
});

test("should return true if the coin is 22 and image is empty", () => {
  const coin1 = coinIsTheCoin21AndImageIsEmpty(21, "empty.jpg");
  expect(coin1).toBe(true);
});

test("should return false if the coin is 21 and image is false", () => {
  const coin1 = coinIsTheCoin21AndImageIsEmpty(21, "tails.jpg");
  expect(coin1).toBe(false);
});

test("should return true if the coin is 41 and image is heads", () => {
  const coin1 = coinIsTheCoin41AndImageIsEmpty(41, "heads.jpg");
  expect(coin1).toBe(false);
});

test("should return false if the coin is 42 and image is heads", () => {
  const coin1 = coinIsTheCoin41AndImageIsEmpty(42, "heads.jpg");
  expect(coin1).toBe(false);
});

test("should return false if the coin is 41 and image is false", () => {
  const coin1 = coinIsTheCoin41AndImageIsEmpty(41, "tails.jpg");
  expect(coin1).toBe(false);
});

test("should return true if the coin is 41 and image is empty", () => {
  const coin1 = coinIsTheCoin41AndImageIsEmpty(41, "empty.jpg");
  expect(coin1).toBe(true);
});

test("should return false if the coin is 41 and image is empty", () => {
  const coin1 = coinIsTheCoin41AndImageIsEmpty(42, "empty.jpg");
  expect(coin1).toBe(false);
});

test("should return true if coin image is heads", () => {
  const validCoinsImage = coinImageIsHeadsJPG("heads.jpg");
  expect(validCoinsImage).toBe(true);
});

test("should return false if coin image is not heads", () => {
  const validCoinsImage = coinImageIsHeadsJPG("tails.jpg");
  expect(validCoinsImage).toBe(false);
});

test("should return false if name is Not Valid", () => {
  const validName = nameIsNotEmptyOrUndefined("");
  expect(validName).toBe(false);
});

test("should return true if name is  Valid", () => {
  const validName = nameIsNotEmptyOrUndefined("rich");
  expect(validName).toBe(true);
});

test("should return tails if coin image is heads", () => {
  const ValidateCorrectImage = returnCorrectImage(
    [1, 2, 3, 4, 5],
    2,
    "heads.jpg"
  );
  expect(ValidateCorrectImage).toBe("tails.jpg");
});

test("should return true if coin image is tails", () => {
  const ValidateCorrectBackground = returnCorrectBackGround("tails.jpg");
  expect(ValidateCorrectBackground).toBe(true);
});

test("should return empty if coin image is empty", () => {
  const ValidateCorrectImage = returnCorrectImage(
    [1, 2, 3, 4, 5],
    2,
    "empty.jpg"
  );
  expect(ValidateCorrectImage).toBe("empty.jpg");
});

test("should return true if coin id in message", () => {
  const messageHasCoinId = doesTheMessageContainTheCoinId([1, 2, 3, 4, 5], 2);
  expect(messageHasCoinId).toBe(true);
});

test("should return false if player is 3 and ship is the first ship", () => {
  const HeadsData = getFalseHeadsData();
  const firstValueDeliver = firstValueDelivered(1, HeadsData, 3);
  expect(firstValueDeliver).toBe(false);
});

test("should return true if player is 3 and ship is the first ship", () => {
  const HeadsData = getTrueHeadsData();
  const firstValueDeliver = firstValueDelivered(1, HeadsData, 3);
  expect(firstValueDeliver).toBe(true);
});

test("should return false if less than 10 coins are changed", () => {
  const HeadsData = getFalseFor10CoinsHeadsData();
  const validCoinsAreFlipped = correctNumberOfCoinsareflipped(10, HeadsData, 1);
  expect(validCoinsAreFlipped).toBe(false);
});

test("should return true if flipped is equal to 10 coins", () => {
  const HeadsData = getTrueWhen10CoinsHeadsData();
  const validCoinsAreFlipped = correctNumberOfCoinsareflipped(10, HeadsData, 1);
  expect(validCoinsAreFlipped).toBe(true);
});

test("should return false if not all the coins are flipped", () => {
  const HeadsData = getFalseWhenAllCoinsHeadsData();
  const validateallCoinsAreFlipped = allCoinsareflipped(HeadsData, 1);
  expect(validateallCoinsAreFlipped).toBe(false);
});

test("should return true if all the coins are flipped", () => {
  const HeadsData = getTrueWhenAllCoinsHeadsData();
  const validateallCoinsAreFlipped = allCoinsareflipped(HeadsData, 1);
  expect(validateallCoinsAreFlipped).toBe(true);
});

function getTrueWhenAllCoinsHeadsData() {
  let playersdata = [];
  for (let iterator = 1; iterator < 12; iterator++) {
    playersdata.push({
      player: 1,
      id: iterator,
      image: "heads.jpg",
      background: false,
      beenflipped: true,
    });
  }
  return playersdata;
}

function getFalseWhenAllCoinsHeadsData() {
  let playersdata = [];
  for (let iterator = 1; iterator < 12; iterator++) {
    playersdata.push({
      player: 1,
      id: iterator,
      image: "heads.jpg",
      background: false,
      beenflipped: iterator % 2 === 0,
    });
  }
  return playersdata;
}

function getTrueWhen10CoinsHeadsData() {
  let playersdata = [];
  for (let iterator = 0; iterator < 13; iterator++) {
    playersdata.push({
      player: iterator < 10 ? 1 : 2,
      id: iterator,
      image: iterator < 10 ? "tails.jpg" : "heads.jpg",
      background: false,
      beenflipped: iterator < 10,
      beenshipped: false,
    });
  }
  return playersdata;
}

function getFalseFor10CoinsHeadsData() {
  let playersdata = [];
  for (let iterator = 0; iterator < 13; iterator++) {
    playersdata.push({
      player: iterator < 10 ? 1 : 2,
      id: iterator,
      image: "heads.jpg",
      background: false,
      beenflipped: false,
    });
  }
  return playersdata;
}

function getTrueHeadsData() {
  let playersdata = [];
  for (let iterator = 0; iterator < 30; iterator++) {
    playersdata.push({
      player: iterator < 10 ? 1 : iterator < 20 ? 2 : 3,
      id: iterator,
      image:
        iterator < 10 ? "empty.jpg" : iterator < 20 ? "empty.jpg" : "heads.jpg",
      background: false,
      beenflipped: iterator === 28 ? true : false,
    });
  }
  return playersdata;
}

function getFalseHeadsData() {
  let playersdata = [];
  for (let iterator = 0; iterator < 30; iterator++) {
    playersdata.push({
      player: iterator < 10 ? 1 : iterator < 20 ? 2 : 3,
      id: iterator,
      image:
        iterator < 10 ? "empty.jpg" : iterator < 20 ? "empty.jpg" : "tails.jpg",
      background: false,
      beenflipped: true,
    });
  }
  return playersdata;
}
