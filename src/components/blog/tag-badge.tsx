import type { Tag } from "@/types/post";

const COLOR_CLASSES: Record<string, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  brown: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  green: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  red: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export function TagBadge({ tag }: { tag: Tag }) {
  const colorClass = COLOR_CLASSES[tag.color] ?? COLOR_CLASSES.default;

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${colorClass}`}>
      {tag.name}
    </span>
  );
}
