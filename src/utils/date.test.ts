import { describe, expect, it } from "vitest";
import { formatDate } from "@/utils/date";

describe("formatDate", () => {
  it("formats an ISO date as a long English date", () => {
    expect(formatDate("2025-09-23")).toBe("September 23, 2025");
  });

  it("formats an ISO datetime the same way, ignoring time-of-day", () => {
    expect(formatDate("2025-09-23T15:30:00.000Z")).toBe("September 23, 2025");
  });
});
