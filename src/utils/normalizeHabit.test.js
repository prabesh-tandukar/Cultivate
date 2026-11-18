import { describe, it, expect } from "vitest";
import { normalizeHabit } from "./normalizeHabit";

describe("normalizeHabit", () => {
  it("adds an empty restDays list when it is missing", () => {
    const habit = {
      completions: {},
    };
    const result = normalizeHabit(habit);
    expect(result.restDays).toEqual([]);
  });
  it("keeps an existing restDays list", () => {
    const habit = {
      restDays: ["2026-11-05"],
      completions: {},
    };
    const result = normalizeHabit(habit);
    expect(result.restDays).toEqual(["2026-11-05"]);
  });

  it("returns a new object and leaves the original unchanged", () => {
    const habit = {
      completions: {},
    };
    const result = normalizeHabit(habit);
    expect(habit.restDays).toBeUndefined();
    expect(result).not.toBe(habit);
  });
});
