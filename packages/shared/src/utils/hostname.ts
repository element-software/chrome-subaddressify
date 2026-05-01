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
