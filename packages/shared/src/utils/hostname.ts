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
  return hostname
    .toLowerCase()
    // Remove protocol
    .replace(/^https?:\/\//, '')
    .replace(/^[a-z]+:\/\//, '')
    // Remove www.
    .replace(/^www\./, '')
    // Remove path, query string, and fragment
    .replace(/[/?#].*$/, '')
    // Replace dots with hyphens
    .replace(/\./g, '-')
    // Remove any characters that are not alphanumeric or hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Collapse multiple hyphens
    .replace(/-+/g, '-')
    // Trim leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}
