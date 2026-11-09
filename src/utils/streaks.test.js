import { describe, it, expect } from "vitest";
import { previousDay, isCompleted, getCurrentStreak } from "./streaks";

describe("previousDay", () => {
  it("returns the day before an ordinary date", () => {
    expect(previousDay("2026-10-15")).toBe("2026-10-14");
  });
  it("returns the last day of the previous month", () => {
    expect(previousDay("2026-03-01")).toBe("2026-02-28");
  });
  it("returns the last day of previous year", () => {
    expect(previousDay("2026-01-01")).toBe("2025-12-31");
  });
  it("returns feb 29 in a leap year", () => {
    expect(previousDay("2024-03-01")).toBe("2024-02-29");
  });
});

describe("isCompleted", () => {
  it("returns true when the logged value is above 0", () => {
    const habit = { completions: { "2026-11-07": 25 } };
    expect(isCompleted(habit, "2026-11-07")).toBe(true);
  });
  it("returns false when the logged value is 0", () => {
    const habit = { completions: { "2026-11-07": 0 } };
    expect(isCompleted(habit, "2026-11-07")).toBe(false);
  });
  it("return false when a date had no entry", () => {
    const habit = { completions: {} };
    expect(isCompleted(habit, "2026-11-07")).toBe(false);
  });
});

describe("getCurrentStreak", () => {
  it("returns streak number for completions day with value more than 0", () => {
    const habit = {
      completions: { "2026-11-08": 5, "2026-11-07": 10, "2026-11-06": 35 },
    };
    expect(getCurrentStreak(habit, "2026-11-08")).toBe(3);
  });
  it("return 0 for nothing logged", () => {
    const anotherHabit = {
      completions: {},
    };
    expect(getCurrentStreak(anotherHabit, "2026-11-08")).toBe(0);
  });
  it("return current streak for single missed day in between logged days", () => {
    const habit = {
      completions: {
        "2026-11-08": 5,
        "2026-11-07": 10,

        "2026-11-05": 35,
        "2026-11-04": 15,
      },
    };
    expect(getCurrentStreak(habit, "2026-11-08")).toBe(4);
  });
  it("return current streak with today not logged yet", () => {
    const habit = {
      completions: {
        "2026-11-07": 0,
        "2026-11-06": 15,
        "2026-11-05": 35,
        "2026-11-04": 0,
        "2026-11-03": 0,
      },
    };
    expect(getCurrentStreak(habit, "2026-11-08")).toBe(2);
  });
});
