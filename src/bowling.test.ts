/*import { Game } from "./bowling";

let g: Game = new Game();

beforeEach(() => {
  g = new Game();
});

describe("Bowling game", () => {
  test("should score 0 for gutter game", () => {
    rollMany(20, 0);
    expect(g.score()).toBe(0);
  });

  test("should score 20 for all ones game", () => {
    rollMany(20, 1);
    expect(g.score()).toBe(20);
  });

  test("should score 16 for a spare followed by a 3 ball", () => {
    rollSpare();
    g.roll(3);
    expect(g.score()).toBe(16);
  });

  test("should score 24 for a strike followed by a 3 and a 4 ball", () => {
    rollStrike();
    g.roll(3);
    g.roll(4);
    rollMany(16, 0);
    expect(g.score()).toBe(24);
  });

  test("should score 300 for perfect game", () => {
    rollMany(12, 10);
    expect(g.score()).toBe(300);
  });

  function rollStrike(): void {
    g.roll(10);
  }

  function rollSpare(): void {
    g.roll(5);
    g.roll(5);
  }

  function rollMany(n: number, pins: number): void {
    for (let i = 0; i < n; i++) {
      g.roll(pins);
    }
  }
});*/
import {
  calculateFrame,
  totalScore,
  bowlingScore,
  bowlingScoreCard,
} from "./bowling";

describe("bowlingScore function", () => {
  test("it should return error message for too few rolls", () => {
    const inputRolls = [1, 2, 3]; // ARRANGE

    const gameScore = bowlingScore(inputRolls); // ACT

    expect(gameScore).toBe("Invalid rolls input"); // ASSERT
  });
  test("it should return error message for too many rolls", () => {
    const inputRolls = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23,
    ]; // ARRANGE

    const gameScore = bowlingScore(inputRolls); // ACT

    expect(gameScore).toBe("Invalid rolls input"); // ASSERT
  });
  test("it should return error message if negative numbers", () => {
    const inputRolls = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, -19, 20,
    ]; // ARRANGE

    const gameScore = bowlingScore(inputRolls); // ACT

    expect(gameScore).toBe("Invalid rolls input"); // ASSERT
  });
  test("it should return 0 for only zero rolls", () => {
    const gameScore = bowlingScore([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    expect(gameScore).toBe(0);
  });
  test("it should return correct score when last frame is a strike", () => {
    const gameScore = bowlingScore([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 7,
    ]);
    expect(gameScore).toBe(17);
  });
  test("it should return correct score when last frame is a spare", () => {
    const gameScore = bowlingScore([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 2,
    ]);
    expect(gameScore).toBe(12);
  });

  test("All strikes should have correct score ", () => {
    const gameScore = bowlingScore([
      10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10,
    ]);
    expect(gameScore).toBe(300);
  });
  test("Complex numbers ", () => {
    const gameScore = bowlingScore([
      5,
      4, // 9
      8,
      2, // S  -- 29
      10,
      0, // X -- 50
      10,
      0, // X -- 61
      1,
      0, // 1 -- 62
      9,
      1, // S -- 72
      0,
      10, // S -- 92
      10,
      0, // X -- 112
      6,
      4, // S -- 129
      7,
      3, // S -- 149
      10,
    ]);
    expect(gameScore).toBe(149);
  });
});

describe("calculateFrame function", () => {
  test("it should return error message for non-zero number after strike", () => {
    const firstRoll = 10; // strike
    const secondRoll = 1; // invalid input
    const frameScore = calculateFrame(firstRoll, secondRoll);
    expect(frameScore).toBe("Invalid frame input");
  });
  test("it should return error message sum in frame is bigger than 10", () => {
    const firstRoll = 7;
    const secondRoll = 5; // invalid input
    const frameScore = calculateFrame(firstRoll, secondRoll);
    expect(frameScore).toBe("Invalid frame input");
  });

  test("it should return the correct score after two rolls", () => {
    const score = calculateFrame(2, 3);
    expect(score).toBe(5);
  });

  test("it should return the / sign if the players hit a spare", () => {
    const firstRoll = 7;
    const secondRoll = 3;

    const score = calculateFrame(firstRoll, secondRoll);
    expect(score).toBe("/");
  });

  test("it should return the X sign if the players hit a strike", () => {
    const firstRoll = 10;
    const secondRoll = 0;

    const score = calculateFrame(firstRoll, secondRoll);
    expect(score).toBe("X");
  });
});

describe("Total Score", () => {
  test("it shoudl correctly calculate the score without spares or strikes", () => {
    const score = totalScore([
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ]);
    expect(score).toBe(20);
  });

  test("it shoudl correctly calculate the score with a spare", () => {
    const score = totalScore([
      [1, 1],
      [1, 1],
      [5, 5],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ]);
    expect(score).toBe(29);
  });

  test("it shoudl correctly calculate the score with multiple spares", () => {
    const score = totalScore([
      [1, 1],
      [1, 1],
      [5, 5],
      [1, 1],
      [1, 1],
      [5, 5],
      [5, 5],
      [1, 1],
      [5, 5],
      [1, 1],
    ]);
    expect(score).toBe(60);
  });

  test("it shoudl correctly calculate the score with a strike", () => {
    const score = totalScore([
      [1, 1],
      [1, 1],
      [10, 0],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ]);
    expect(score).toBe(30);
  });

  test("it shoudl correctly calculate the score with multiple strikes", () => {
    const score = totalScore([
      [1, 1],
      [1, 1],
      [10, 0],
      [10, 0],
      [5, 1],
      [1, 1],
      [10, 0],
      [1, 1],
      [1, 1],
      [1, 1],
    ]);
    expect(score).toBe(71);
  });
});

describe("bowlingScoreCard function", () => {
  test("it should correct scorecard when no strikes/spares", () => {
    const frames = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ];
    const scoreCard = bowlingScoreCard(frames);
    expect(scoreCard).toBe("2222222222");
  });
  test("it should return correct scorecard when spare is present", () => {
    const frames = [
      [7, 3],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [9, 1],
      [1, 1],
    ];
    const scoreCard = bowlingScoreCard(frames);
    expect(scoreCard).toBe("/2222222/2");
  });
  test("it should return correct scorecard when strike is present", () => {
    const frames = [
      [7, 3],
      [1, 1],
      [10, 0],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [9, 1],
      [10, 0],
    ];
    const scoreCard = bowlingScoreCard(frames);
    expect(scoreCard).toBe("/2X22222/X");
  });
});
