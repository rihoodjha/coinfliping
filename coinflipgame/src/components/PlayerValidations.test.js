import {
  isTheLastPlayer,
  TimerSecondsAreGreaterThanZero,
} from "./PlayerValidations";
test("should return false when player is not the last player", () => {
  expect(isTheLastPlayer(3, 1)).toBe(false);
});
test("should return true when player is the last player", () => {
  expect(isTheLastPlayer(3, 3)).toBe(true);
});
test("should true when seconds is greater than 0", () => {
  expect(TimerSecondsAreGreaterThanZero(3)).toBe(true);
});

test("should return false when seconds is 0", () => {
  expect(TimerSecondsAreGreaterThanZero(0)).toBe(false);
});
