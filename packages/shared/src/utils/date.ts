/**
 * Formats a Date object as YYYYMMDD (no separators) for use in email tags.
 * Example: new Date('2026-05-01') => '20260501'
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Formats a Date object as YYYY-MM-DD for display purposes.
 * Example: new Date('2026-05-01') => '2026-05-01'
 */
export function formatDateDisplay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
