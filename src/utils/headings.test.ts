import { describe, expect, it } from "vitest";
import { collectHeadings } from "@/utils/headings";
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

describe("collectHeadings", () => {
  it("filters to only heading_1/2/3 blocks, preserving order", () => {
    const blocks: Block[] = [
      { id: "1", type: "paragraph", richText: richText("intro") },
      { id: "2", type: "heading_1", richText: richText("Section A") },
      { id: "3", type: "divider" },
      { id: "4", type: "heading_2", richText: richText("Section A.1") },
    ];

    const headings = collectHeadings(blocks);

    expect(headings.map((h) => h.id)).toEqual(["2", "4"]);
  });

  it("returns an empty array when there are no headings", () => {
    const blocks: Block[] = [{ id: "1", type: "paragraph", richText: richText("no headings here") }];
    expect(collectHeadings(blocks)).toEqual([]);
  });
});
