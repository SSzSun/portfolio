const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2023-01-01", null -> "Jan 2023 - Present" */
export function formatPeriod(start: string, end: string | null): string {
  const fmt = (d: string) => monthYear.format(new Date(`${d}T00:00:00Z`));
  return `${fmt(start)} - ${end ? fmt(end) : "Present"}`;
}
