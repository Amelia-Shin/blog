import type { CodeBlock } from "@/types/block";

export function CodeBlockComponent({ block }: { block: CodeBlock }) {
  const code = block.richText.map((item) => item.text).join("");

  return (
    <div className="my-4 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
      <div className="border-b border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        {block.language}
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
