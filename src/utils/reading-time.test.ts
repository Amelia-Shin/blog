import { describe, expect, it } from "vitest";
import { calculateReadingTimeMinutes } from "@/utils/reading-time";
import type { Block, RichText } from "@/types/block";

function richText(text: string): RichText[] {
  return [
    {
      text,
      href: null,
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
    },
  ];
}

describe("calculateReadingTimeMinutes", () => {
  it("returns at least 1 minute for empty content", () => {
    expect(calculateReadingTimeMinutes([])).toBe(1);
  });

  it("scales with character count at 500 chars/minute", () => {
    const blocks: Block[] = [
      { id: "1", type: "paragraph", richText: richText("가".repeat(1000)) },
    ];
    expect(calculateReadingTimeMinutes(blocks)).toBe(2);
  });

  it("includes text inside nested list/toggle children", () => {
    const blocks: Block[] = [
      {
        id: "1",
        type: "toggle",
        richText: richText("가".repeat(100)),
        children: [
          { id: "2", type: "paragraph", richText: richText("나".repeat(900)) },
        ],
      },
    ];
    expect(calculateReadingTimeMinutes(blocks)).toBe(2);
  });

  it("ignores blocks with no text content", () => {
    const blocks: Block[] = [{ id: "1", type: "divider" }, { id: "2", type: "table_of_contents" }];
    expect(calculateReadingTimeMinutes(blocks)).toBe(1);
  });
});
