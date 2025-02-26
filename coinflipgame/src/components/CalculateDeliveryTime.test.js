import { CalculateDeliveryTime } from "./CalculateDeliveryTime";

test("should return 0:00 when 0 and 0 are passed in", () => {
  expect(CalculateDeliveryTime("0:00", "0:00")).toBe("0:00");
});
test("should return 0:01 when 0:00 and 0:01 are passed in", () => {
  expect(CalculateDeliveryTime("0:01", "0:00")).toBe("0:01");
});

test("should return 0:01 when 0:10 and 0:11 are passed in", () => {
  expect(CalculateDeliveryTime("0:11", "0:10")).toBe("0:01");
});

test("should return 0:01 when 1:10 and 2:11 are passed in", () => {
  expect(CalculateDeliveryTime("1:11", "1:10")).toBe("0:01");
});

test("should return 3:01 when 2:10 and 5:11 are passed in", () => {
  expect(CalculateDeliveryTime("5:11", "2:10")).toBe("3:01");
});

test("should return 0:00 when 5:10 and 2:11 are passed in", () => {
  expect(CalculateDeliveryTime("2:11", "5:10")).toBe("0:00");
});

test("should return not a number when 1 oclock and 2:05pm are passed in", () => {
  expect(CalculateDeliveryTime("1 oclock", "2:05pm")).toBe("Not a number");
});
