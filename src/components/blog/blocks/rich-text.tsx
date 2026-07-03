import type { RichText } from "@/types/block";

const TEXT_COLOR_CLASSES: Record<string, string> = {
  gray: "text-gray-500 dark:text-gray-400",
  brown: "text-amber-700 dark:text-amber-500",
  orange: "text-orange-600 dark:text-orange-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  green: "text-green-600 dark:text-green-400",
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400",
  pink: "text-pink-600 dark:text-pink-400",
  red: "text-red-600 dark:text-red-400",
};

const HIGHLIGHT_COLOR_CLASSES: Record<string, string> = {
  gray: "bg-gray-100 dark:bg-gray-400/25",
  brown: "bg-amber-100 dark:bg-amber-400/25",
  orange: "bg-orange-100 dark:bg-orange-400/25",
  yellow: "bg-yellow-100 dark:bg-yellow-400/25",
  green: "bg-green-100 dark:bg-green-400/25",
  blue: "bg-blue-100 dark:bg-blue-400/25",
  purple: "bg-purple-100 dark:bg-purple-400/25",
  pink: "bg-pink-100 dark:bg-pink-400/25",
  red: "bg-red-100 dark:bg-red-400/25",
};

function annotate(text: string, annotations: RichText["annotations"]): React.ReactNode {
  let node: React.ReactNode = text;
  if (annotations.code) {
    node = <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">{node}</code>;
  }
  if (annotations.bold) node = <strong>{node}</strong>;
  if (annotations.italic) node = <em>{node}</em>;
  if (annotations.strikethrough) node = <s>{node}</s>;
  if (annotations.underline) node = <u>{node}</u>;

  if (annotations.color !== "default") {
    if (annotations.color.endsWith("_background")) {
      const key = annotations.color.replace("_background", "");
      const colorClass = HIGHLIGHT_COLOR_CLASSES[key];
      if (colorClass) node = <mark className={`rounded px-0.5 ${colorClass}`}>{node}</mark>;
    } else {
      const colorClass = TEXT_COLOR_CLASSES[annotations.color];
      if (colorClass) node = <span className={colorClass}>{node}</span>;
    }
  }

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
