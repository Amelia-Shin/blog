import type { Block, HeadingBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";

const INDENT_BY_TYPE: Record<HeadingBlock["type"], string> = {
  heading_1: "",
  heading_2: "pl-4",
  heading_3: "pl-8",
};

function collectHeadings(blocks: Block[]): HeadingBlock[] {
  return blocks.filter(
    (block): block is HeadingBlock =>
      block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3"
  );
}

export function TocBlockComponent({ allBlocks }: { allBlocks: Block[] }) {
  const headings = collectHeadings(allBlocks);

  if (headings.length === 0) return null;

  return (
    <nav className="my-4 rounded-md border border-gray-200 p-4 text-sm dark:border-gray-800">
      <ol className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id} className={INDENT_BY_TYPE[heading.type]}>
            <a href={`#${heading.id}`} className="hover:underline">
              <RichTextRenderer items={heading.richText} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
