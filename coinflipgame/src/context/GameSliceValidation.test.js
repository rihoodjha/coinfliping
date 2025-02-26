import {
  actionPayloadMessagesHaveLength,
  imageBelongsToPlayer,
  imageIsEqualToEmpty,
  imageIsEqualToTails,
  noMoreCoinsToFlip,
} from "./GameSliceValidation";
import { HeadsData } from "./HeadsData";
test("should return false if payload is undefined", () => {
  const payloadisNotUndefined = actionPayloadMessagesHaveLength(undefined);
  expect(payloadisNotUndefined).toBe(false);
});
test("should return true if payload is not undefined", () => {
  const payloadisNotUndefined = actionPayloadMessagesHaveLength([test, test]);
  expect(payloadisNotUndefined).toBe(true);
});

test("should return true if image belongs to player", () => {
  const values = HeadsData;
  const place = 20;
  const playerid = 2;
  const imagebelongstoplayer = imageBelongsToPlayer(values, place, playerid);
  expect(imagebelongstoplayer).toBe(true);
});

test("should return false if image does not belong to the player", () => {
  const values = HeadsData;
  const place = 20;
  const playerid = 1;
  const imagebelongstoplayer = imageBelongsToPlayer(values, place, playerid);
  expect(imagebelongstoplayer).toBe(false);
});

test("should return false if image does not belong to the player 3", () => {
  const values = HeadsData;
  const place = 41;
  const playerid = 2;
  const imagebelongstoplayer = imageBelongsToPlayer(values, place, playerid);
  expect(imagebelongstoplayer).toBe(false);
});

test("should return false if image is not tails", () => {
  const values = HeadsData;
  const place = 20;
  const isTails = imageIsEqualToTails(values, place);
  expect(isTails).toBe(false);
});

test("should return true if image is tails", () => {
  let values = HeadsData;
  const place = 2;
  values[place].image = "tails.jpg";
  const isTails = imageIsEqualToTails(values, place);
  expect(isTails).toBe(true);
});

test("should return false if image is empty", () => {
  const values = HeadsData;
  const place = 21;
  values[place].image = "empty.jpg";
  const isEmpty = imageIsEqualToEmpty(values, place);
  expect(isEmpty).toBe(true);
});


test("should return true if there are no more coins to flip", () => {
  const values = HeadsData;
  const place = 61;
  const isEmpty = noMoreCoinsToFlip(values, place);
  expect(isEmpty).toBe(true);
});

test("should return false if there are more coins to flip", () => {
  const values = HeadsData;
  const place = 50;
  const isEmpty = noMoreCoinsToFlip(values, place);
  expect(isEmpty).toBe(false);
});


test("should return true if there are less than 101 coins to flip", () => {
  const values = HeadsData;
  const place = 101;
  const isEmpty = noMoreCoinsToFlip(values, place);
  expect(isEmpty).toBe(true);
});

