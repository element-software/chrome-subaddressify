/**
 * Publishes the Chrome extension to the Chrome Web Store.
 *
 * Required environment variables:
 *   CHROME_EXTENSION_ID    - The extension ID from the Chrome Web Store dashboard
 *   CHROME_CLIENT_ID       - OAuth2 client ID from Google Cloud Console
 *   CHROME_CLIENT_SECRET   - OAuth2 client secret from Google Cloud Console
 *   CHROME_REFRESH_TOKEN   - OAuth2 refresh token for the Web Store API
 *
 * Usage:
 *   CHROME_EXTENSION_ID=xxx CHROME_CLIENT_ID=xxx ... node scripts/publish-extension.mjs
 *
 * Docs: https://developer.chrome.com/docs/webstore/using-api/
 */

const {
  CHROME_EXTENSION_ID,
  CHROME_CLIENT_ID,
  CHROME_CLIENT_SECRET,
  CHROME_REFRESH_TOKEN,
} = process.env;

const missing = [
  ['CHROME_EXTENSION_ID', CHROME_EXTENSION_ID],
  ['CHROME_CLIENT_ID', CHROME_CLIENT_ID],
  ['CHROME_CLIENT_SECRET', CHROME_CLIENT_SECRET],
  ['CHROME_REFRESH_TOKEN', CHROME_REFRESH_TOKEN],
].filter(([, v]) => !v).map(([k]) => k);

if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  console.error('See scripts/publish-extension.mjs for setup instructions.');
  process.exit(1);
}

import { resolve, join } from 'path';
import { existsSync, readdirSync } from 'fs';

const releasesDir = resolve(process.cwd(), '../../releases');

const zipFiles = existsSync(releasesDir)
  ? readdirSync(releasesDir).filter((f) => f.endsWith('.zip'))
  : [];

if (zipFiles.length === 0) {
  console.error('❌ No ZIP file found in releases/. Run `pnpm zip:extension` first.');
  process.exit(1);
}

const zipPath = join(releasesDir, zipFiles.sort().at(-1));

console.log(`📦 Publishing: ${zipPath}`);
console.log('');
console.log('Step 1: Obtain access token...');

const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: CHROME_CLIENT_ID,
    client_secret: CHROME_CLIENT_SECRET,
    refresh_token: CHROME_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  }),
});

const tokenData = await tokenResponse.json();
const accessToken = tokenData.access_token;

if (!accessToken) {
  console.error('❌ Failed to obtain access token:', tokenData);
  process.exit(1);
}

console.log('✅ Access token obtained.');
console.log('');
console.log('⚠️  To complete publishing, wire this script to the Chrome Web Store API.');
console.log('    Recommended: use the `chrome-webstore-upload` npm package.');
console.log('    https://www.npmjs.com/package/chrome-webstore-upload');
console.log('');
console.log('Example code:');
console.log(`
  import chromeWebstoreUpload from 'chrome-webstore-upload';
  const store = chromeWebstoreUpload({
    extensionId: process.env.CHROME_EXTENSION_ID,
    clientId: process.env.CHROME_CLIENT_ID,
    clientSecret: process.env.CHROME_CLIENT_SECRET,
    refreshToken: process.env.CHROME_REFRESH_TOKEN,
  });
  await store.uploadExisting(fs.createReadStream(zipPath));
  await store.publish();
`);
