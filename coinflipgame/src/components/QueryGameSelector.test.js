import { getGameSelected } from "./QueryGameSelector";
test("should return 20 if game selected is 20", () => {
  const GameTypeData = [
    {
      id: 0,
      game: 20,
      selected: true,
    },
    {
      id: 1,
      game: 10,
      selected: false,
    },
    {
      id: 2,
      game: 5,
      selected: false,
    },
  ];

  const gameselected = getGameSelected(GameTypeData);
  expect(gameselected).toBe(20);
});
test("should return 10 if game selected is 10", () => {
  const GameTypeData = [
    {
      id: 0,
      game: 20,
      selected: false,
    },
    {
      id: 1,
      game: 10,
      selected: true,
    },
    {
      id: 2,
      game: 5,
      selected: false,
    },
  ];

  const gameselected = getGameSelected(GameTypeData);
  expect(gameselected).toBe(10);
});
test("should return 20 if game selected is undefind", () => {
  const GameTypeData = undefined;

  const gameselected = getGameSelected(GameTypeData);
  expect(gameselected).toBe(20);
});
