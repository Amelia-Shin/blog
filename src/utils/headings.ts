import type { Block, HeadingBlock } from "@/types/block";

export function collectHeadings(blocks: Block[]): HeadingBlock[] {
  return blocks.filter(
    (block): block is HeadingBlock =>
      block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3"
  );
}
