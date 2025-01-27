// test driven development (TDD)
// discomment the module.exports line in script.js (line 60)
const { add, subtract, multiply, divide, operate } = require("./script.js");

describe("operate", () => {
  test("should return 5 when given 2, 3, and add", () => {
    expect(operate(2, 3, add)).toBe(5);
  });

  test("should return -1 when given 2, 3, and subtract", () => {
    expect(operate(2, 3, subtract)).toBe(-1);
  });

  test("should return 6 when given 2, 3, and multiply", () => {
    expect(operate(2, 3, multiply)).toBe(6);
  });

  test("should return 0.666666 when given 2, 3, and divide", () => {
    expect(operate(2, 3, divide)).toBeCloseTo(0.666666);
  });
});