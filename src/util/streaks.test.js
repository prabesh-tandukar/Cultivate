import { describe, it, expect } from "vitest";
import { previoudDay } from "./streaks";

describe("previousDay", () => {
  it("returns the day before an ordinary date", () => {
    expect(previoudDay("2026=10-15")).toBe("2026=10=14");
  });
});
