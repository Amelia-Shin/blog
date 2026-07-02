import type { Block, HeadingBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";
import { collectHeadings } from "@/utils/headings";

const INDENT_BY_TYPE: Record<HeadingBlock["type"], string> = {
  heading_1: "pl-3",
  heading_2: "pl-6",
  heading_3: "pl-9",
};

export function TableOfContents({ blocks }: { blocks: Block[] }) {
  const headings = collectHeadings(blocks);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden max-h-[70vh] overflow-y-auto text-sm lg:block">
      <p className="mb-2 font-semibold text-gray-900 dark:text-gray-100">목차</p>
      <ol className="space-y-1 border-l border-gray-200 dark:border-gray-800">
        {headings.map((heading) => (
          <li key={heading.id} className={INDENT_BY_TYPE[heading.type]}>
            <a
              href={`#${heading.id}`}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <RichTextRenderer items={heading.richText} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
