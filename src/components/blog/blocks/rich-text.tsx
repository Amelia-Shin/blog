import type { RichText } from "@/types/block";

function annotate(text: string, annotations: RichText["annotations"]): React.ReactNode {
  let node: React.ReactNode = text;
  if (annotations.code) {
    node = <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">{node}</code>;
  }
  if (annotations.bold) node = <strong>{node}</strong>;
  if (annotations.italic) node = <em>{node}</em>;
  if (annotations.strikethrough) node = <s>{node}</s>;
  if (annotations.underline) node = <u>{node}</u>;
  return node;
}

export function RichTextRenderer({ items }: { items: RichText[] }) {
  return (
    <>
      {items.map((item, index) => {
        const node = annotate(item.text, item.annotations);

        if (!item.href) {
          return <span key={index}>{node}</span>;
        }

        const isExternal = item.href.startsWith("http");
        return (
          <a
            key={index}
            href={item.href}
            className="underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {node}
          </a>
        );
      })}
    </>
  );
}
