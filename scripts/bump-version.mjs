/**
 * Bumps the extension version in manifest.json and package.json, commits, tags, and pushes.
 * Pushing the tag triggers the GitHub Actions publish workflow.
 *
 * Usage:
 *   node scripts/bump-version.mjs <version>
 *   node scripts/bump-version.mjs 1.2.0
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

const version = process.argv[2]?.replace(/^v/, '');

if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error('Usage: node scripts/bump-version.mjs <version>  (e.g. 1.2.0)');
  process.exit(1);
}

const root = resolve(import.meta.dirname, '..');
const manifestPath = resolve(root, 'apps/extension/manifest.json');
const packagePath = resolve(root, 'apps/extension/package.json');

// Update manifest.json
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const prev = manifest.version;
manifest.version = version;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

// Update package.json
const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
pkg.version = version;
writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`Bumped ${prev} → ${version}`);

// Commit and tag
execSync(`git add "${manifestPath}" "${packagePath}"`, { stdio: 'inherit' });
execSync(`git commit -m "chore: bump extension to v${version}"`, { stdio: 'inherit' });
execSync(`git tag v${version}`, { stdio: 'inherit' });
execSync(`git push --follow-tags`, { stdio: 'inherit' });

console.log(`\nReleased v${version} — publish workflow triggered.`);
