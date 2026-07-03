import { getPublishedPosts, updatePageLastSyncedAt } from "@/lib/notion/queries";
import { mapPostSyncStatus } from "@/lib/notion/mapper";
import { triggerDeploy } from "@/lib/vercel";

export type SyncResult = {
  checked: number;
  changedSlugs: string[];
  deployed: boolean;
};

function isChanged(lastEditedTime: string, lastSyncedAt: string | null): boolean {
  if (!lastSyncedAt) return true;
  return new Date(lastEditedTime).getTime() > new Date(lastSyncedAt).getTime();
}

export async function syncPublishedPosts(): Promise<SyncResult> {
  const pages = await getPublishedPosts();
  const statuses = pages.map(mapPostSyncStatus);
  const changed = statuses.filter((status) => isChanged(status.lastEditedTime, status.lastSyncedAt));

  if (changed.length === 0) {
    return { checked: statuses.length, changedSlugs: [], deployed: false };
  }

  await triggerDeploy();

  const syncedAt = new Date().toISOString();
  await Promise.all(changed.map((status) => updatePageLastSyncedAt(status.id, syncedAt)));

  return {
    checked: statuses.length,
    changedSlugs: changed.map((status) => status.slug),
    deployed: true,
  };
}
