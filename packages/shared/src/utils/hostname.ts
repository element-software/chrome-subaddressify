/**
 * Sanitises a hostname so it is safe for use in an email sub-address tag.
 *
 * Steps:
 * 1. Remove protocol (http://, https://, etc.)
 * 2. Remove www. prefix
 * 3. Replace dots with hyphens
 * 4. Remove characters that are not alphanumeric or hyphens
 * 5. Lowercase everything
 * 6. Trim leading/trailing hyphens
 *
 * Example: 'https://www.Example.com' => 'example-com'
 */
export function sanitiseHostname(hostname: string): string {
  // Limit input length to prevent slow processing on adversarial input
  const input = hostname.slice(0, 2048).toLowerCase();

  // Remove protocol (http://, https://, or any scheme://)
  const noProtocol = input.replace(/^[a-z]+:\/\//, '');

  // Remove www. prefix
  const noWww = noProtocol.replace(/^www\./, '');

  // Strip path, query, and fragment by taking only the first segment before / ? #
  const slashIdx = noWww.indexOf('/');
  const queryIdx = noWww.indexOf('?');
  const hashIdx = noWww.indexOf('#');
  const cutAt = [slashIdx, queryIdx, hashIdx]
    .filter((i) => i !== -1)
    .reduce((min, i) => Math.min(min, i), noWww.length);
  const hostOnly = noWww.slice(0, cutAt);

  // Replace dots with hyphens, strip non-alphanumeric/hyphen chars, lowercase
  const sanitised = hostOnly
    .replace(/\./g, '-')
    .replace(/[^a-z0-9-]/g, '');

  // Collapse runs of hyphens using a loop to avoid backtracking on large inputs
  let collapsed = sanitised;
  while (collapsed.includes('--')) {
    collapsed = collapsed.replace(/--/g, '-');
  }

  // Trim leading/trailing hyphens
  return collapsed.replace(/^-+/, '').replace(/-+$/, '');
}

const COMPOUND_TLDS = new Set([
  'co-uk', 'co-au', 'co-nz', 'co-in', 'co-jp', 'co-za', 'com-au', 'com-br',
]);

const KNOWN_TLDS = new Set([
  'com', 'org', 'net', 'io', 'co', 'uk', 'de', 'fr', 'au', 'gov', 'edu',
  'me', 'dev', 'app', 'ai', 'info', 'biz', 'us', 'ca', 'jp', 'cn', 'nl',
  'es', 'it', 'ru', 'br', 'in', 'nz', 'se', 'no', 'dk', 'fi', 'pl', 'cz',
  'ro', 'hu', 'pt', 'be', 'ch', 'at', 'mx', 'ar', 'cl', 'pe', 'eg', 'za',
  'ng', 'ke', 'ie', 'sg', 'hk', 'tw', 'kr', 'eu',
]);

/**
 * Best-effort restoration of a sanitised hostname back to a browsable domain.
 * Detects common TLD patterns and replaces the last hyphen separator(s) with dots.
 *
 * Example: 'google-com' => 'google.com', 'amazon-co-uk' => 'amazon.co.uk'
 *
 * When the original hostname is available (stored as `AliasEntry.originalHostname`),
 * prefer that over this function.
 */
export function restoreHostname(sanitised: string): string {
  const parts = sanitised.split('-');
  if (parts.length < 2) return sanitised;

  if (parts.length >= 3) {
    const lastTwo = parts[parts.length - 2] + '-' + parts[parts.length - 1];
    if (COMPOUND_TLDS.has(lastTwo)) {
      const domain = parts.slice(0, -2).join('-');
      const tld = parts.slice(-2).join('.');
      return domain + '.' + tld;
    }
  }

  const lastPart = parts[parts.length - 1];
  if (KNOWN_TLDS.has(lastPart)) {
    return parts.slice(0, -1).join('-') + '.' + lastPart;
  }

  return sanitised;
}
