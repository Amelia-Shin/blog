import { Client, isFullDatabase } from "@notionhq/client";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

let cachedClient: Client | null = null;

export function getNotionClient(): Client {
  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = new Client({ auth: requireEnv("NOTION_TOKEN") });
  return cachedClient;
}

let cachedDataSourceId: string | null = null;

/**
 * The Notion API (2025-09-03) queries pages through a data source, not the
 * database directly. A database can have multiple data sources, so we resolve
 * and cache the first one tied to NOTION_DATABASE_ID.
 */
export async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) {
    return cachedDataSourceId;
  }

  const databaseId = requireEnv("NOTION_DATABASE_ID");
  const client = getNotionClient();
  const database = await client.databases.retrieve({
    database_id: databaseId,
  });

  if (!isFullDatabase(database)) {
    throw new Error(`Received a partial Notion database response: ${databaseId}`);
  }

  const dataSource = database.data_sources[0];

  if (!dataSource) {
    throw new Error(`No data source found for Notion database: ${databaseId}`);
  }

  cachedDataSourceId = dataSource.id;
  return cachedDataSourceId;
}
