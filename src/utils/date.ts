const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(dateString: string): string {
  return formatter.format(new Date(dateString));
}
