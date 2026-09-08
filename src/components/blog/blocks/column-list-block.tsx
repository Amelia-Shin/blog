import type { ColumnListBlock } from "@/types/block";
import { BlockRenderer } from "@/components/blog/blocks/block-renderer";

export function ColumnListBlockComponent({ block }: { block: ColumnListBlock }) {
  return (
    <div
      className="my-4 grid grid-cols-1 gap-4 sm:grid-flow-col sm:auto-cols-fr"
    >
      {block.columns.map((column) => (
        <div key={column.id} className="min-w-0">
          <BlockRenderer blocks={column.children} />
        </div>
      ))}
    </div>
  );
}
