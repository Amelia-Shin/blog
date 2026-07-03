export function isPostChanged(lastEditedTime: string, lastSyncedAt: string | null): boolean {
  if (!lastSyncedAt) return true;
  return new Date(lastEditedTime).getTime() > new Date(lastSyncedAt).getTime();
}
