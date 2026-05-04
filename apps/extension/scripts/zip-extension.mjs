/**
 * Creates a ZIP file of the built extension for Chrome Web Store upload.
 * Run after `pnpm build:extension`.
 *
 * Usage: node scripts/zip-extension.mjs
 */
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';

// Read manifest version
const distDir = resolve(process.cwd(), 'dist');
const manifestPath = join(distDir, 'manifest.json');

if (!existsSync(manifestPath)) {
  console.error('❌ dist/manifest.json not found. Run `pnpm build:extension` first.');
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const version = manifest.version ?? '1.0.0';
const releasesDir = resolve(process.cwd(), '../../releases');
const zipName = `subaddressify-v${version}.zip`;
const zipPath = join(releasesDir, zipName);

if (!existsSync(releasesDir)) {
  mkdirSync(releasesDir, { recursive: true });
}

try {
  execSync(`cd "${distDir}" && zip -r "${zipPath}" .`, { stdio: 'inherit' });
  console.log(`✅ Extension zipped: ${zipPath}`);
} catch {
  console.error('❌ Failed to create ZIP. Make sure `zip` is available on your system.');
  process.exit(1);
}
