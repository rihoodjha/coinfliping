import {
  getPlayers,
  getNumberOfPlayersJoined,
  getThePlayerNameWith,
} from "./QueryPlayerSelector";
const PlayerTypeData = [
  {
    key: 1,
    name: "",
    moved: "heads.jpg",
    socket: "",
    connected: false,
  },
  {
    key: 2,
    name: "",
    moved: "heads.jpg",
    socket: "",
    connected: false,
  },
  {
    key: 3,
    name: "",
    moved: "heads.jpg",
    socket: "",
    connected: false,
  },
];
const PlayerTypeDataConnected = [
  {
    key: 1,
    name: "",
    moved: "heads.jpg",
    socket: "dfadfa",
    connected: true,
  },
  {
    key: 2,
    name: "",
    moved: "heads.jpg",
    socket: "",
    connected: false,
  },
  {
    key: 3,
    name: "",
    moved: "heads.jpg",
    socket: "",
    connected: false,
  },
];
const PlayerTypeDataAllJoined = [
  {
    key: 1,
    name: "fasdfd",
    moved: "heads.jpg",
    socket: "adfadfa",
    connected: true,
  },
  {
    key: 2,
    name: "adfadf",
    moved: "heads.jpg",
    socket: "afdadf",
    connected: true,
  },
  {
    key: 3,
    name: "adfadf",
    moved: "heads.jpg",
    socket: "gasdfa",
    connected: true,
  },
];
const PlayerTypeDataTwoPlayersJoined = [
  {
    key: 1,
    name: "fasdfd",
    moved: "heads.jpg",
    socket: "adfadfa",
    connected: true,
  },
  {
    key: 2,
    name: "adfadf",
    moved: "heads.jpg",
    socket: "afdadf",
    connected: true,
  },
  {
    key: 3,
    name: "",
    moved: "heads.jpg",
    socket: "",
    connected: false,
  },
];
const PlayerTypeDataWithRich = [
  {
    key: 1,
    name: "",
    moved: "heads.jpg",
    socket: "adfadfa",
    connected: true,
  },
  {
    key: 2,
    name: "Rich",
    moved: "heads.jpg",
    socket: "afdadf",
    connected: true,
  },
  {
    key: 3,
    name: "",
    moved: "heads.jpg",
    socket: "",
    connected: false,
  },
];

test("should return 1 if no players have joined", () => {
  const playerselected = getPlayers(PlayerTypeData);
  expect(playerselected).toBe(1);
});
test("should return 2 if one players have joined", () => {
  const playerselected = getPlayers(PlayerTypeDataConnected);
  expect(playerselected).toBe(2);
});

test("should return 0 if all players have joined", () => {
  const playerselected = getPlayers(PlayerTypeDataAllJoined);
  expect(playerselected).toBe(0);
});

test("should return count 3 if all players have joined", () => {
  const playerselected = getNumberOfPlayersJoined(PlayerTypeDataAllJoined);
  expect(playerselected).toBe(3);
});

test("should return count 2 if 2 players have joined", () => {
  const playerselected = getNumberOfPlayersJoined(
    PlayerTypeDataTwoPlayersJoined
  );
  expect(playerselected).toBe(2);
});

test("should return count 2 if 2 players have joined without name", () => {
  const playerselected = getNumberOfPlayersJoined(
    PlayerTypeDataTwoPlayersJoined
  );
  expect(playerselected).toBe(2);
});

test("should return player name when player is 2 and name is Rich", () => {
  const expected = {
    key: 2,
    name: "Rich",
    moved: "heads.jpg",
    socket: "afdadf",
    connected: true,
  };

  const playerselected = getThePlayerNameWith(PlayerTypeDataWithRich, 2);
  expect(playerselected.name).toBe(expected.name);
  expect(playerselected.key).toBe(expected.key);
});
