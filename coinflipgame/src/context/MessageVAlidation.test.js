import { messagesAreNotBlankOrEmpty } from "./MessageValidation";

test("should return false if array is undefined", () => {
  const playerValidation = messagesAreNotBlankOrEmpty(undefined);
  expect(playerValidation).toBe(false);
});

test("should return false if array is empty", () => {
  const playerValidation = messagesAreNotBlankOrEmpty([]);
  expect(playerValidation).toBe(false);
});
