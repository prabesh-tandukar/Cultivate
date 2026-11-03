import { describe, it, expect } from "vitest";
import { previousDay } from "./streaks";

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
