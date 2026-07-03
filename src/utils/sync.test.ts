import { describe, expect, it } from "vitest";
import { isPostChanged } from "@/utils/sync";

describe("isPostChanged", () => {
  it("treats a post with no lastSyncedAt as changed", () => {
    expect(isPostChanged("2026-07-01T00:00:00.000Z", null)).toBe(true);
  });

  it("treats a post edited after its last sync as changed", () => {
    expect(isPostChanged("2026-07-02T00:00:00.000Z", "2026-07-01T00:00:00.000Z")).toBe(true);
  });

  it("treats a post edited before its last sync as unchanged", () => {
    expect(isPostChanged("2026-07-01T00:00:00.000Z", "2026-07-02T00:00:00.000Z")).toBe(false);
  });

  it("treats a post edited at the exact same instant as unchanged", () => {
    const timestamp = "2026-07-01T00:00:00.000Z";
    expect(isPostChanged(timestamp, timestamp)).toBe(false);
  });
});
