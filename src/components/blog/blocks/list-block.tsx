import type { BulletedListItemBlock, NumberedListItemBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";
import { BlockRenderer } from "@/components/blog/blocks/block-renderer";

type ListBlockProps = {
  type: "bulleted_list_item" | "numbered_list_item";
  items: (BulletedListItemBlock | NumberedListItemBlock)[];
};

export function ListBlockComponent({ type, items }: ListBlockProps) {
  const Tag = type === "bulleted_list_item" ? "ul" : "ol";
  const listStyle = type === "bulleted_list_item" ? "list-disc" : "list-decimal";

  return (
    <Tag className={`my-4 space-y-1 pl-6 ${listStyle}`}>
      {items.map((item) => (
        <li key={item.id}>
          <RichTextRenderer items={item.richText} />
          {item.children.length > 0 && <BlockRenderer blocks={item.children} />}
        </li>
      ))}
    </Tag>
  );
}
