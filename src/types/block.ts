export type RichText = {
  text: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
};

type BaseBlock = {
  id: string;
};

export type ParagraphBlock = BaseBlock & {
  type: "paragraph";
  richText: RichText[];
};

export type HeadingBlock = BaseBlock & {
  type: "heading_1" | "heading_2" | "heading_3";
  richText: RichText[];
};

export type BulletedListItemBlock = BaseBlock & {
  type: "bulleted_list_item";
  richText: RichText[];
  children: Block[];
};

export type NumberedListItemBlock = BaseBlock & {
  type: "numbered_list_item";
  richText: RichText[];
  children: Block[];
};

export type QuoteBlock = BaseBlock & {
  type: "quote";
  richText: RichText[];
};

export type DividerBlock = BaseBlock & {
  type: "divider";
};

export type CodeBlock = BaseBlock & {
  type: "code";
  richText: RichText[];
  language: string;
};

export type ImageBlock = BaseBlock & {
  type: "image";
  url: string;
  caption: RichText[];
  width?: number;
};

export type VideoBlock = BaseBlock & {
  type: "video";
  url: string;
  source: "file" | "external";
  caption: RichText[];
};

export type CalloutBlock = BaseBlock & {
  type: "callout";
  richText: RichText[];
  icon: string | null;
};

export type BookmarkBlock = BaseBlock & {
  type: "bookmark";
  url: string;
  caption: RichText[];
};

export type TableOfContentsBlock = BaseBlock & {
  type: "table_of_contents";
};

export type ToggleBlock = BaseBlock & {
  type: "toggle";
  richText: RichText[];
  children: Block[];
};

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | BulletedListItemBlock
  | NumberedListItemBlock
  | QuoteBlock
  | DividerBlock
  | CodeBlock
  | ImageBlock
  | VideoBlock
  | CalloutBlock
  | BookmarkBlock
  | TableOfContentsBlock
  | ToggleBlock;
