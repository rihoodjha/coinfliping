import {
  getTimerSelected,
  getTheNameForThe,
  getPlayerWaiting,
  getTimerSelectedFrom,
  getPlayerWaitingForGame,
} from "./QueryTimerSelector";
test("should return 1 if timer player is 1", () => {
  const TimerTypeData = [
    {
      player: 1,
      id: 1,
      timer: "0:00",
      name: "",
    },

    {
      player: 2,
      id: 4,
      timer: "0:00",
      name: "",
    },

    {
      player: 3,
      id: 7,
      timer: "0:00",
      name: "",
    },
  ];

  const timerselected = getTimerSelected(TimerTypeData, 1);
  expect(timerselected).toBe(1);
});

test("should return 0 if player hasn't started", () => {
  const TimerTypeData = [
    {
      player: 1,
      id: 1,
      timer: "0:00",
      name: "",
      playing: 0,
    },

    {
      player: 2,
      id: 4,
      timer: "0:00",
      name: "",
      playing: 0,
    },

    {
      player: 3,
      id: 7,
      timer: "0:00",
      name: "",
      playing: 0,
    },
  ];

  const playerstarted = getPlayerWaiting(TimerTypeData, 1);
  expect(playerstarted).toBe(0);
});

test("should return 1 if player has started", () => {
  const TimerTypeData = [
    {
      player: 1,
      id: 1,
      timer: "0:00",
      name: "",
      playing: 1,
    },

    {
      player: 2,
      id: 4,
      timer: "0:00",
      name: "",
      playing: 0,
    },

    {
      player: 3,
      id: 7,
      timer: "0:00",
      name: "",
      playing: 0,
    },
  ];

  const playerstarted = getPlayerWaiting(TimerTypeData, 1);
  expect(playerstarted).toBe(1);
});

test("should return 1 if player has started the second game", () => {
  const TimerTypeData = [
    {
      player: 1,
      id: 1,
      timer: "0:00",
      name: "",
      playing: 0,
      gametypeid: 0,
    },
    {
      player: 1,
      id: 2,
      timer: "0:00",
      name: "",
      playing: 1,
      gametypeid: 1,
    },
    {
      player: 2,
      id: 4,
      timer: "0:00",
      name: "",
      playing: 0,
      gametypeid: 0,
    },

    {
      player: 3,
      id: 7,
      timer: "0:00",
      name: "",
      playing: 0,
      gametypeid: 0,
    },
  ];

  const playerstarted = getPlayerWaitingForGame(TimerTypeData, 1, 1);
  expect(playerstarted).toBe(1);
});

test("should return 3 if timer player is 1 and 1 and 2 have times", () => {
  const TimerTypeData = [
    {
      player: 1,
      id: 1,
      timer: "0:01",
      name: "",
    },

    {
      player: 2,
      id: 6,
      timer: "0:00",
      name: "",
    },
    {
      player: 3,
      id: 7,
      timer: "0:00",
      name: "",
    },
  ];

  const timerselected = getTimerSelected(TimerTypeData, 1);
  expect(timerselected).toBe(1);
});

test("should return 4 if timer player is 2", () => {
  const TimerTypeData = [
    {
      player: 1,
      id: 1,
      timer: "0:00",
      name: "",
    },

    {
      player: 2,
      id: 4,
      timer: "0:00",
      name: "",
    },

    {
      player: 3,
      id: 7,
      timer: "0:00",
      name: "",
    },
  ];

  const timerselected = getTimerSelected(TimerTypeData, 2);
  expect(timerselected).toBe(4);
});

test("should return 5 if timer player is 3", () => {
  const TimerTypeData = [
    {
      player: 1,
      id: 1,
      timer: "0:00",
      name: "",
    },

    {
      player: 2,
      id: 4,
      timer: "0:00",
      name: "",
    },

    {
      player: 3,
      id: 7,
      timer: "0:00",
      name: "",
    },
  ];

  const timerselected = getTimerSelected(TimerTypeData, 3);
  expect(timerselected).toBe(7);
});

test("should return 9 if timer player is 3", () => {
  const TimerTypeData = [
    {
      player: 1,
      id: 1,
      timer: "0:00",
      name: "",
    },

    {
      player: 2,
      id: 4,
      timer: "0:00",
      name: "",
    },

    {
      player: 3,
      id: 9,
      timer: "0:00",
      name: "",
    },
  ];

  const timerselected = getTimerSelected(TimerTypeData, 3);
  expect(timerselected).toBe(9);
});

test("should return 10 if timer player is 3", () => {
  const TimerTypeData = [
    {
      player: 1,
      id: 1,
      timer: "0:00",
      name: "",
      gametypeid: 0,
    },
    {
      player: 1,
      id: 2,
      timer: "0:00",
      name: "",
      gametypeid: 1,
    },
    {
      player: 1,
      id: 3,
      timer: "0:00",
      name: "",
      gametypeid: 2,
    },
    {
      player: 2,
      id: 4,
      timer: "0:00",
      name: "",
      gametypeid: 0,
    },

    {
      player: 3,
      id: 9,
      timer: "0:00",
      name: "",
      gametypeid: 0,
    },

    {
      player: 3,
      id: 10,
      timer: "0:00",
      name: "",
      gametypeid: 1,
    },
  ];

  const timerselected = getTimerSelectedFrom(TimerTypeData, 3, 1);
  expect(timerselected).toBe(10);
});

test("should return first value if player is blank and playerid is 4", () => {
  const name = getTheNameForThe(undefined, 4);
  expect(name).toBe("First Value");
});

test("should return Player 3 if player is blank and playerid is 3", () => {
  const player = {
    key: 3,
    name: "",
    moved: "heads.jpg",
    socket: "",
    connected: false,
  };
  const name = getTheNameForThe(player, 3);
  expect(name).toBe("Player 3");
});

test("should return Rich if player is Rich and playerid is 2", () => {
  const player = {
    key: 2,
    name: "Rich",
    moved: "heads.jpg",
    socket: "",
    connected: false,
  };
  const name = getTheNameForThe(player, 2);
  expect(name).toBe("Rich");
});
