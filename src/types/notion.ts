import type {
  PageObjectResponse,
  BlockObjectResponse,
  QueryDataSourceResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client";

export type NotionPage = PageObjectResponse;
export type NotionBlock = BlockObjectResponse;

export type NotionResponse<T> = {
  results: T[];
  hasMore: boolean;
  nextCursor: string | null;
};

export type NotionQueryResult = QueryDataSourceResponse;
export type NotionBlockChildrenResult = ListBlockChildrenResponse;
