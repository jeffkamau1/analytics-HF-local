import { describe, it, expect } from "vitest";
import { parseAmount, normalizeGender, parseDate } from "../features/data_cleaning_validation/cleaning";

describe("Data Cleaning", () => {
  it("parses amounts correctly", () => {
    expect(parseAmount("$1,234.56")).toBe(1234.56);
    expect(parseAmount("N/A")).toBe(0);
    expect(parseAmount(null)).toBe(0);
  });

  it("normalizes gender correctly", () => {
    expect(normalizeGender("M")).toBe("Male");
    expect(normalizeGender("female")).toBe("Female");
    expect(normalizeGender("Non-binary")).toBe("Other");
    expect(normalizeGender("")).toBe("Other");
  });

  it("parses dates correctly", () => {
    expect(parseDate("2023-12-15")).toEqual(new Date("2023-12-15"));
    expect(parseDate("12/15/2023")).toEqual(new Date(2023, 11, 15));
    expect(parseDate("invalid")).toBeNull();
  });
});
