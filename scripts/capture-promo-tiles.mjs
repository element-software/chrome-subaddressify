#!/usr/bin/env node
/**
 * Generates Chrome Web Store promo tile images using Sharp + SVG.
 * No build or server required — runs standalone.
 *
 * Outputs:
 *   chrome-store/screenshots/promo-small.png   (440×280)
 *   chrome-store/screenshots/promo-marquee.png (1400×560)
 */
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'chrome-store/screenshots');

const ICON_B64 = readFileSync(
  path.join(ROOT, 'apps/website/public/icon128.png'),
).toString('base64');

const DEMO_EMAIL = 'you+2026-05-01-example-com@yourdomain.com';

/** Dark background matching the extension UI (Tailwind slate-900). */
const BG = '#0f172a';
/** Slightly lighter surface for cards/inputs. */
const SURFACE = '#1e293b';
/** Blue accent matching the extension. */
const BLUE = '#3b82f6';
/** Lighter blue for the "for every website" headline word. */
const BLUE_LIGHT = '#60a5fa';
/** White headline text. */
const WHITE = '#f1f5f9';
/** Muted body/subtitle text. */
const MUTED = '#94a3b8';
/** Even more muted footer text. */
const DIM = '#64748b';

/**
 * Renders a horizontal row of pill-shaped chips starting at (startX, y).
 * Width is estimated from label length so no manual measuring is needed.
 */
function chipsRow(labels, startX, y, chipH, gap, bgColor, textColor, fontSize = 10) {
  const hPad = 11;
  const approxCharPx = fontSize * 0.58;
  const textDy = Math.round(chipH * 0.65);
  let x = startX;
  return labels.map((label) => {
    const chipW = Math.round(label.length * approxCharPx + hPad * 2);
    const svg = `
    <rect x="${x}" y="${y}" width="${chipW}" height="${chipH}" rx="${Math.floor(chipH / 2)}"
          fill="${bgColor}"/>
    <text x="${x + Math.floor(chipW / 2)}" y="${y + textDy}" text-anchor="middle"
          font-family="Arial, sans-serif" font-size="${fontSize}" fill="${textColor}">${label}</text>`;
    x += chipW + gap;
    return svg;
  }).join('');
}

/** Renders the real extension icon centred at (cx, cy) with diameter r*2. */
function logoIcon(cx, cy, r) {
  const size = r * 2;
  return `<image x="${cx - r}" y="${cy - r}" width="${size}" height="${size}"
          href="data:image/png;base64,${ICON_B64}"/>`;
}

function smallPromoSvg(w, h) {
  const pad = 24;
  // Header row
  const logoR = 10;
  const logoX = pad + logoR;
  const logoY = pad + logoR;
  // Headline
  const hl1Y = logoY + logoR + 22;
  const hl2Y = hl1Y + 30;
  // Subtitle
  const subY = hl2Y + 20;
  const sub2Y = subY + 16;
  // Email field
  const fieldY = sub2Y + 20;
  const fieldH = 26;
  const chipH = 22;
  const chipGap = 7;
  const chipRow1Y = fieldY + fieldH + 14;
  const chipRow2Y = chipRow1Y + chipH + 8;
  // Footer
  const footerY = h - 14;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="${BG}" />

  <!-- header -->
  ${logoIcon(logoX, logoY, logoR)}
  <text x="${logoX + logoR + 8}" y="${logoY + 4}"
        font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="${WHITE}">Subaddressify</text>

  <!-- headline -->
  <text x="${pad}" y="${hl1Y}"
        font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="${WHITE}">A unique email address</text>
  <text x="${pad}" y="${hl2Y}"
        font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="${BLUE_LIGHT}">for every website</text>

  <!-- subtitle -->
  <text x="${pad}" y="${subY}"
        font-family="Arial, sans-serif" font-size="11" fill="${MUTED}">Automatically generate sub-addressed email variants based on</text>
  <text x="${pad}" y="${sub2Y}"
        font-family="Arial, sans-serif" font-size="11" fill="${MUTED}">where you sign up. Filter, track, and stay organised.</text>

  <!-- email field -->
  <rect x="${pad}" y="${fieldY}" width="${w - pad * 2}" height="${fieldH}" rx="6" fill="${SURFACE}" />
  <text x="${pad + 10}" y="${fieldY + 17}"
        font-family="'Courier New', Courier, monospace" font-size="11" fill="${BLUE_LIGHT}">${DEMO_EMAIL}</text>

  <!-- feature chips row 1 (blue accent) -->
  ${chipsRow(['Privacy-first', 'Auto-fill', 'Leak tracking'], pad, chipRow1Y, chipH, chipGap, '#162a45', BLUE_LIGHT)}

  <!-- feature chips row 2 (neutral) -->
  ${chipsRow(['100% Free', 'No signup', 'Stored locally', 'Open source'], pad, chipRow2Y, chipH, chipGap, SURFACE, MUTED)}

  <!-- footer -->
  <text x="${pad}" y="${footerY}"
        font-family="Arial, sans-serif" font-size="10" fill="${DIM}">&#x2022; Free Chrome Extension &#xB7; No Account Required</text>
  <text x="${w - pad}" y="${footerY}" text-anchor="end"
        font-family="Arial, sans-serif" font-size="10" fill="${DIM}">subaddressify.com</text>
</svg>`;
}

function marqueePromoSvg(w, h) {
  // Two-column layout: left = copy, right = popup card mockup.
  const lPad = 64;

  // --- Left column ---
  const logoR = 14;
  const logoX = lPad + logoR;
  const logoY = 52;
  const hl1Y = 122;   // "A unique email address"
  const hl2Y = 184;   // "for every website"
  const subY = 218;
  const sub2Y = 244;
  const b1Y = 286;    // feature bullets
  const b2Y = 318;
  const b3Y = 350;
  const fieldY = 388;
  const fieldH = 42;
  const fieldW = 580;
  const chipH = 26;
  const chipGap = 8;
  const chipRow1Y = fieldY + fieldH + 14;
  const chipRow2Y = chipRow1Y + chipH + 8;
  const footerY = h - 20;

  // --- Right card ---
  const cardX = 768;
  const cardW = 568;
  const cardH = 460;
  const cardY = Math.floor((h - cardH) / 2);   // vertically centred
  const ip = 24;  // inner padding
  const ix = cardX + ip;              // inner left
  const ir = cardX + cardW - ip;     // inner right

  // Card row positions (absolute y)
  const cLogoY   = cardY + 38;
  const cSiteTop = cardY + 56;
  const cAddrTop = cardY + 120;
  const cBtnTop  = cardY + 188;
  const cDiv1    = cardY + 242;
  const cHistY   = cardY + 264;
  const cR1      = cardY + 290;
  const cR2      = cardY + 318;
  const cR3      = cardY + 346;
  const cDiv2    = cardY + 370;
  const cFootY   = cardY + 396;
  // "Stored locally" + links row
  const cInfoY   = cardY + 432;

  const checkmark = (x, y, size) => `
    <circle cx="${x + size / 2}" cy="${y - size * 0.35}" r="${size * 0.7}" fill="${BLUE}" opacity="0.18"/>
    <text x="${x + size / 2}" y="${y}" text-anchor="middle"
          font-family="Arial, sans-serif" font-size="${size}" fill="${BLUE}">✓</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="${BG}" />

  <!-- subtle radial glow behind card -->
  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.10"/>
    <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
  </radialGradient>
  <ellipse cx="${cardX + cardW / 2}" cy="${h / 2}" rx="${cardW * 0.75}" ry="${cardH * 0.75}" fill="url(#glow)"/>

  <!-- ── LEFT COLUMN ── -->

  <!-- logo + name -->
  ${logoIcon(logoX, logoY, logoR)}
  <text x="${logoX + logoR + 10}" y="${logoY + 5}"
        font-family="Arial, sans-serif" font-size="17" font-weight="600" fill="${WHITE}">Subaddressify</text>

  <!-- headline -->
  <text x="${lPad}" y="${hl1Y}"
        font-family="Arial, sans-serif" font-size="52" font-weight="700" fill="${WHITE}">A unique email address</text>
  <text x="${lPad}" y="${hl2Y}"
        font-family="Arial, sans-serif" font-size="52" font-weight="700" fill="${BLUE_LIGHT}">for every website</text>

  <!-- subtitle -->
  <text x="${lPad}" y="${subY}"
        font-family="Arial, sans-serif" font-size="19" fill="${MUTED}">Automatically generate sub-addressed email variants</text>
  <text x="${lPad}" y="${sub2Y}"
        font-family="Arial, sans-serif" font-size="19" fill="${MUTED}">based on where you sign up. Filter, track, and stay organised.</text>

  <!-- feature bullets -->
  ${checkmark(lPad, b1Y, 15)}
  <text x="${lPad + 24}" y="${b1Y}"
        font-family="Arial, sans-serif" font-size="16" fill="${WHITE}">Unique address per site — never reuse</text>
  ${checkmark(lPad, b2Y, 15)}
  <text x="${lPad + 24}" y="${b2Y}"
        font-family="Arial, sans-serif" font-size="16" fill="${WHITE}">Auto-fills email fields in one click</text>
  ${checkmark(lPad, b3Y, 15)}
  <text x="${lPad + 24}" y="${b3Y}"
        font-family="Arial, sans-serif" font-size="16" fill="${WHITE}">See exactly which site shared your data</text>

  <!-- email field -->
  <rect x="${lPad}" y="${fieldY}" width="${fieldW}" height="${fieldH}" rx="8" fill="${SURFACE}" />
  <text x="${lPad + 14}" y="${fieldY + 27}"
        font-family="'Courier New', Courier, monospace" font-size="14" fill="${BLUE_LIGHT}">${DEMO_EMAIL}</text>

  <!-- feature chips row 1 (blue accent) -->
  ${chipsRow(['Privacy-first', 'Auto-fill', 'Leak tracking'], lPad, chipRow1Y, chipH, chipGap, '#162a45', BLUE_LIGHT, 13)}

  <!-- feature chips row 2 (neutral) -->
  ${chipsRow(['100% Free', 'No signup', 'Stored locally', 'Open source'], lPad, chipRow2Y, chipH, chipGap, SURFACE, MUTED, 13)}

  <!-- footer -->
  <text x="${lPad}" y="${footerY}"
        font-family="Arial, sans-serif" font-size="13" fill="${DIM}">&#x2022; Free Chrome Extension &#xB7; No Account Required</text>

  <!-- ── RIGHT CARD ── -->

  <!-- card shadow -->
  <rect x="${cardX + 4}" y="${cardY + 6}" width="${cardW}" height="${cardH}" rx="14"
        fill="#000" opacity="0.35"/>
  <!-- card body -->
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="14"
        fill="${SURFACE}" stroke="#334155" stroke-width="1"/>

  <!-- card header row -->
  ${logoIcon(ix + 12, cLogoY, 11)}
  <text x="${ix + 36}" y="${cLogoY + 4}"
        font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="${WHITE}">Subaddressify</text>
  <text x="${ir}" y="${cLogoY + 4}" text-anchor="end"
        font-family="Arial, sans-serif" font-size="11" fill="${DIM}">v1.1.5</text>

  <!-- current site box -->
  <rect x="${ix}" y="${cSiteTop}" width="${cardW - ip * 2}" height="54" rx="8" fill="${BG}"/>
  <text x="${ix + 12}" y="${cSiteTop + 18}"
        font-family="Arial, sans-serif" font-size="10" fill="${DIM}">Current site</text>
  <text x="${ix + 12}" y="${cSiteTop + 38}"
        font-family="Arial, sans-serif" font-size="13" font-weight="500" fill="#e2e8f0">github.com</text>

  <!-- sub-address box -->
  <rect x="${ix}" y="${cAddrTop}" width="${cardW - ip * 2}" height="54" rx="8" fill="${BG}"/>
  <text x="${ix + 12}" y="${cAddrTop + 18}"
        font-family="Arial, sans-serif" font-size="10" fill="${DIM}">Generated sub-address</text>
  <text x="${ix + 12}" y="${cAddrTop + 38}"
        font-family="'Courier New', Courier, monospace" font-size="12" fill="${BLUE_LIGHT}">you+2026-05-01-github-com@yourdomain.com</text>

  <!-- buttons -->
  <rect x="${ix}" y="${cBtnTop}" width="${(cardW - ip * 2) / 2 - 6}" height="38" rx="8" fill="#334155"/>
  <text x="${ix + (cardW - ip * 2) / 4 - 6}" y="${cBtnTop + 24}" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="13" fill="#e2e8f0">&#x1F4CB; Copy</text>
  <rect x="${ix + (cardW - ip * 2) / 2 + 6}" y="${cBtnTop}" width="${(cardW - ip * 2) / 2 - 6}" height="38" rx="8" fill="${BLUE}"/>
  <text x="${ix + (cardW - ip * 2) * 3 / 4 + 6}" y="${cBtnTop + 24}" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="13" fill="white">&#x270F; Insert</text>

  <!-- divider 1 -->
  <line x1="${ix}" y1="${cDiv1}" x2="${ir}" y2="${cDiv1}" stroke="#334155" stroke-width="1"/>

  <!-- history label -->
  <text x="${ix}" y="${cHistY}"
        font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="${MUTED}">Recent aliases</text>

  <!-- alias rows -->
  <text x="${ix}" y="${cR1}"
        font-family="'Courier New', Courier, monospace" font-size="11" fill="${BLUE_LIGHT}">you+2026-04-28-netflix-com@yourdomain.com</text>
  <text x="${ir}" y="${cR1}" text-anchor="end"
        font-family="Arial, sans-serif" font-size="11" fill="${DIM}">netflix.com</text>

  <text x="${ix}" y="${cR2}"
        font-family="'Courier New', Courier, monospace" font-size="11" fill="${BLUE_LIGHT}">you+2026-04-15-amazon-com@yourdomain.com</text>
  <text x="${ir}" y="${cR2}" text-anchor="end"
        font-family="Arial, sans-serif" font-size="11" fill="${DIM}">amazon.com</text>

  <text x="${ix}" y="${cR3}"
        font-family="'Courier New', Courier, monospace" font-size="11" fill="${BLUE_LIGHT}">you+2026-03-30-twitter-com@yourdomain.com</text>
  <text x="${ir}" y="${cR3}" text-anchor="end"
        font-family="Arial, sans-serif" font-size="11" fill="${DIM}">twitter.com</text>

  <!-- divider 2 -->
  <line x1="${ix}" y1="${cDiv2}" x2="${ir}" y2="${cDiv2}" stroke="#334155" stroke-width="1"/>

  <!-- card footer -->
  <text x="${ix}" y="${cFootY}"
        font-family="Arial, sans-serif" font-size="11" fill="${DIM}">Stored locally only.</text>
  <text x="${ir - 80}" y="${cFootY}"
        font-family="Arial, sans-serif" font-size="11" fill="${BLUE}">History</text>
  <text x="${ir}" y="${cFootY}" text-anchor="end"
        font-family="Arial, sans-serif" font-size="11" fill="${BLUE}">Settings</text>

  <!-- card tagline -->
  <text x="${ix}" y="${cInfoY}"
        font-family="Arial, sans-serif" font-size="11" fill="${DIM}">&#x2022; Free &#xB7; No Account Required &#xB7; Privacy-first</text>
  <text x="${ir}" y="${cInfoY}" text-anchor="end"
        font-family="Arial, sans-serif" font-size="11" fill="${DIM}">subaddressify.com</text>
</svg>`;
}

async function renderTile(svgString, outPath) {
  await sharp(Buffer.from(svgString))
    .flatten({ background: BG })
    .png()
    .toFile(outPath);
  console.log(`  wrote ${path.relative(ROOT, outPath)}`);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  console.log('Generating promo tiles…');

  await renderTile(
    smallPromoSvg(440, 280),
    path.join(OUT_DIR, 'promo-small.png'),
  );

  await renderTile(
    marqueePromoSvg(1400, 560),
    path.join(OUT_DIR, 'promo-marquee.png'),
  );

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
