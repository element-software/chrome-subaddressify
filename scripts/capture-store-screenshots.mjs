#!/usr/bin/env node
/**
 * Captures 1280×800 PNGs for the Chrome Web Store listing.
 * Prerequisites: pnpm build (shared, extension, website).
 *
 * Notes:
 * - Demo frames use the production Next.js site (`next start`). Cookie consent is
 *   applied before React mounts via localStorage (`cookie_consent` = declined)—same as a user who clicked Decline, without overlay blur or multi-navigation waits.
 * - Options tabs use the built extension bundle served over HTTP with a minimal
 *   `chrome.storage` / `chrome.runtime` mock so the real UI renders without an
 *   unpacked Chrome profile (CLI-loaded extensions are unreliable under automation).
 * - The popup strip matches production Tailwind/CSS and the same sub-address
 *   formula as the extension; it is composited for listing layouts.
 */
import { spawn } from 'node:child_process';
import { readFileSync, readdirSync, mkdirSync, rmSync, mkdtempSync, existsSync, copyFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

/** Mirrors packages/shared for deterministic screenshot emails (same output as the extension). */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function sanitiseHostname(hostname) {
  const input = hostname.slice(0, 2048).toLowerCase();
  const noProtocol = input.replace(/^[a-z]+:\/\//, '');
  const noWww = noProtocol.replace(/^www\./, '');
  const slashIdx = noWww.indexOf('/');
  const queryIdx = noWww.indexOf('?');
  const hashIdx = noWww.indexOf('#');
  const cutAt = [slashIdx, queryIdx, hashIdx]
    .filter((i) => i !== -1)
    .reduce((min, i) => Math.min(min, i), noWww.length);
  const hostOnly = noWww.slice(0, cutAt);
  const sanitised = hostOnly.replace(/\./g, '-').replace(/[^a-z0-9-]/g, '');
  let collapsed = sanitised;
  while (collapsed.includes('--')) {
    collapsed = collapsed.replace(/--/g, '-');
  }
  return collapsed.replace(/^-+/, '').replace(/-+$/, '');
}

function generateSubAddress(baseEmail, hostname, date = new Date()) {
  const trimmed = baseEmail.trim();
  const atIndex = trimmed.lastIndexOf('@');
  if (atIndex === -1) throw new Error(`Invalid base email: ${baseEmail}`);
  const local = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex + 1);
  const sanitisedHostname = sanitiseHostname(hostname);
  const dateString = formatDate(date);
  const tag = `${dateString}-${sanitisedHostname}`;
  const subAddress = `${local}+${tag}@${domain}`;
  return { subAddress, tag, sanitisedHostname, dateString };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const EXT_DIST = path.join(ROOT, 'apps/extension/dist');
const WEBSITE_DIR = path.join(ROOT, 'apps/website');
const OUT_DIR = path.join(ROOT, 'chrome-store/screenshots');
const PORT = 3456;
const STATIC_PORT = 9988;
const DEMO_URL = `http://localhost:${PORT}/demo`;
const EXT_ORIGIN = `http://127.0.0.1:${STATIC_PORT}`;
/** Must stay in sync with `CookieConsent` storage key in apps/website. */
const MARKETING_COOKIE_STORAGE_KEY = 'cookie_consent';
const FIXED_DATE = new Date('2026-05-07T12:00:00.000Z');
const BASE_EMAIL = 'jane@example.com';

function extVersion() {
  return JSON.parse(readFileSync(path.join(ROOT, 'apps/extension/package.json'), 'utf8')).version;
}

function popupCssHref() {
  const assetsDir = path.join(EXT_DIST, 'assets');
  const files = readdirSync(assetsDir);
  const css = files.find((f) => f.endsWith('.css'));
  if (!css) throw new Error('Missing built CSS in apps/extension/dist/assets');
  return path.join(assetsDir, css);
}

function buildPopupFixtureHtml(hostname, subAddress) {
  const cssPath = popupCssHref();
  const v = extVersion();
  const cssUrl = pathToFileURL(cssPath).href;
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" />
<link rel="stylesheet" href="${cssUrl}" />
<title>Subaddressify</title>
</head>
<body class="bg-gray-900 text-gray-100 w-80 min-h-48 m-0">
<div id="fixture-app" class="w-80">
  <div class="p-4">
    <div class="flex items-center gap-2 mb-3">
      <div class="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">@</div>
      <div>
        <h1 class="text-sm font-semibold text-gray-100">Subaddressify</h1>
        <p class="text-gray-500 text-xs">v${v}</p>
      </div>
    </div>
    <div class="bg-gray-800 rounded-lg p-3 mb-3">
      <p class="text-gray-400 text-xs mb-1">Current site</p>
      <p class="text-gray-200 text-xs font-mono truncate" title="${hostname}">${hostname}</p>
    </div>
    <div class="bg-gray-800 rounded-lg p-3 mb-3">
      <p class="text-gray-400 text-xs mb-1">Generated sub-address</p>
      <p class="text-blue-400 text-xs font-mono break-all">${subAddress}</p>
    </div>
    <div class="flex gap-2 mb-3">
      <button type="button" class="flex-1 bg-gray-700 text-gray-200 text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1">
        <span>📋</span><span>Copy</span>
      </button>
      <button type="button" class="flex-1 bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1">
        <span>✏️</span><span>Insert</span>
      </button>
    </div>
    <div class="flex items-center justify-between">
      <p class="text-gray-600 text-xs">Stored locally only.</p>
      <div class="flex gap-3">
        <span class="text-blue-500 text-xs">History</span>
        <span class="text-blue-500 text-xs">Settings</span>
      </div>
    </div>
  </div>
</div>
</body></html>`;
}

async function waitForHttp(url, timeoutMs = 120_000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function startNextServer() {
  const child = spawn('pnpm', ['exec', 'next', 'start', '-p', String(PORT)], {
    cwd: WEBSITE_DIR,
    stdio: 'ignore',
    detached: false,
  });
  return child;
}

function startExtensionStaticServer() {
  return spawn('pnpm', ['exec', 'serve', '-l', String(STATIC_PORT), EXT_DIST], {
    cwd: ROOT,
    stdio: 'ignore',
  });
}

async function registerChromeExtensionMock(context, snap) {
  await context.addInitScript((s) => {
    const store = {
      baseEmail: s.baseEmail,
      autoFillEnabled: s.autoFillEnabled,
      reusePerDomain: s.reusePerDomain,
      aliases: s.aliases,
    };
    window.chrome = {
      runtime: {
        getManifest: () => ({ version: s.version }),
        getURL: (p) => `${s.origin}/${String(p).replace(/^\//, '')}`,
      },
      storage: {
        sync: {
          get: async (keys) => {
            if (keys == null || keys === undefined) return { ...store };
            const keyList = Array.isArray(keys) ? keys : [keys];
            const out = {};
            for (const k of keyList) {
              if (Object.prototype.hasOwnProperty.call(store, k)) out[k] = store[k];
            }
            return out;
          },
          set: async () => {},
        },
      },
    };
  }, snap);
}

function buildSeedPayload() {
  return {
    baseEmail: BASE_EMAIL,
    autoFillEnabled: true,
    reusePerDomain: true,
    aliases: {
      localhost: {
        email: generateSubAddress(BASE_EMAIL, 'localhost', FIXED_DATE).subAddress,
        createdAt: new Date('2026-05-05T10:00:00Z').getTime(),
        originalHostname: 'localhost',
      },
      'news-example-org': {
        email: generateSubAddress(BASE_EMAIL, 'news.example.org', FIXED_DATE).subAddress,
        createdAt: new Date('2026-05-04T15:30:00Z').getTime(),
        originalHostname: 'news.example.org',
      },
      'github-com': {
        email: generateSubAddress(BASE_EMAIL, 'github.com', new Date('2026-05-01T08:00:00Z')).subAddress,
        createdAt: new Date('2026-05-01T08:00:00Z').getTime(),
        originalHostname: 'github.com',
      },
    },
  };
}

async function capturePopupPng(context, fixturePath, outPath) {
  const page = await context.newPage();
  await page.setViewportSize({ width: 360, height: 520 });
  await page.goto(pathToFileURL(fixturePath).href);
  await page.locator('#fixture-app').screenshot({ path: outPath });
  await page.close();
  return outPath;
}

async function compositeHero(basePath, popupPath, outPath) {
  const popupBuf = await sharp(popupPath).png().toBuffer();
  const meta = await sharp(popupBuf).metadata();
  const pw = meta.width ?? 320;
  const ph = meta.height ?? 400;
  const left = 1280 - pw - 32;
  const top = Math.max(32, Math.floor((800 - ph) / 2));
  await sharp(basePath)
    .composite([{ input: popupBuf, left, top }])
    .png()
    .toFile(outPath);
}

async function main() {
  const manifestPath = path.join(EXT_DIST, 'manifest.json');
  if (!existsSync(manifestPath)) {
    throw new Error('Missing apps/extension/dist — run pnpm build:extension (and build:website) first.');
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const workDir = mkdtempSync(path.join(tmpdir(), 'subaddr-work-'));
  const fixtureHtml = path.join(workDir, 'popup-fixture.html');
  const { subAddress } = generateSubAddress(BASE_EMAIL, 'localhost', FIXED_DATE);
  const hostname = 'localhost';
  writeFileSync(fixtureHtml, buildPopupFixtureHtml(hostname, subAddress));

  const nextProc = startNextServer();
  const extServe = startExtensionStaticServer();
  try {
    await waitForHttp(DEMO_URL);
    await waitForHttp(`${EXT_ORIGIN}/options.html`);

    const browser = await chromium.launch({ headless: true });

    try {
      const seed = {
        ...buildSeedPayload(),
        version: extVersion(),
        origin: EXT_ORIGIN,
      };

      const extCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
      await registerChromeExtensionMock(extCtx, seed);

      const opt = await extCtx.newPage();
      await opt.goto(`${EXT_ORIGIN}/options.html`, { waitUntil: 'networkidle' });
      await opt.waitForSelector('#pane-settings');
      await opt.screenshot({ path: path.join(OUT_DIR, '04-settings.png'), type: 'png' });
      await opt.close();

      const hist = await extCtx.newPage();
      await hist.goto(`${EXT_ORIGIN}/options.html#history`, { waitUntil: 'networkidle' });
      await hist.waitForSelector('#pane-history');
      await hist.screenshot({ path: path.join(OUT_DIR, '05-alias-history.png'), type: 'png' });
      await hist.close();

      await extCtx.close();

      const demoCtx = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        locale: 'en-GB',
      });
      await demoCtx.addInitScript((key) => {
        localStorage.setItem(key, 'denied');
      }, MARKETING_COOKIE_STORAGE_KEY);
      const page = await demoCtx.newPage();

      await page.goto(DEMO_URL, { waitUntil: 'networkidle' });
      const heroBase = path.join(workDir, 'hero-base.png');
      await page.screenshot({ path: heroBase, type: 'png' });

      const popupShotPath = path.join(workDir, 'popup-strip.png');
      const popupShot = await capturePopupPng(demoCtx, fixtureHtml, popupShotPath);
      await compositeHero(heroBase, popupShot, path.join(OUT_DIR, '01-hero-demo-and-popup.png'));

      const popupCanvas = path.join(workDir, 'popup-on-canvas.png');
      const popupBuf = await sharp(popupShot).png().toBuffer();
      const pm = await sharp(popupBuf).metadata();
      const pw = pm.width ?? 320;
      const ph = pm.height ?? 400;
      await sharp({
        create: {
          width: 1280,
          height: 800,
          channels: 4,
          background: { r: 17, g: 24, b: 39, alpha: 1 },
        },
      })
        .composite([
          {
            input: popupBuf,
            left: Math.floor((1280 - pw) / 2),
            top: Math.floor((800 - ph) / 2),
          },
        ])
        .png()
        .toFile(popupCanvas);
      copyFileSync(popupCanvas, path.join(OUT_DIR, '03-extension-popup.png'));

      await page.goto(DEMO_URL, { waitUntil: 'networkidle' });
      const fill = generateSubAddress(BASE_EMAIL, 'localhost', FIXED_DATE).subAddress;
      await page.locator('#newsletter-email').fill(fill);
      await page.screenshot({ path: path.join(OUT_DIR, '02-demo-email-filled.png'), type: 'png' });

      await demoCtx.close();
    } finally {
      await browser.close();
    }
  } finally {
    nextProc.kill('SIGTERM');
    extServe.kill('SIGTERM');
    try {
      rmSync(workDir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }

  console.log(`Chrome Web Store screenshots saved to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
