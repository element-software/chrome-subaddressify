# AI Agent Guide — chrome-subaddressify

This document gives AI agents the context needed to work effectively in this repository.

---

## Project Overview

**Subaddressify** is a Chrome extension (Manifest V3) paired with a Next.js marketing website. The extension automatically generates unique sub-addressed email variants for any website the user visits.

Sub-address format:
```
user+YYYYMMDD-hostname@domain.com
```
Example: `user+20260501-example-com@example.com`

---

## Repository Structure

```
chrome-subaddressify/          # monorepo root
├── apps/
│   ├── extension/             # Chrome extension (Manifest V3, Vite)
│   └── website/               # Marketing website (Next.js 15)
├── packages/
│   └── shared/                # Shared utilities and TypeScript types
├── package.json               # Root scripts and devDependencies
├── pnpm-workspace.yaml        # pnpm workspace config
└── tsconfig.json              # Root TypeScript config
```

### `packages/shared`

Package name: `@subaddressify/shared`

Core logic used by both the extension and (potentially) the website:

| File | Purpose |
|---|---|
| `src/types/index.ts` | All shared TypeScript types and interfaces |
| `src/utils/email.ts` | `validateEmail`, `splitEmail`, `generateSubAddress` |
| `src/utils/hostname.ts` | `sanitiseHostname` — cleans a hostname for use in an email tag |
| `src/utils/date.ts` | `formatDate` (YYYYMMDD), `formatDateDisplay` (YYYY-MM-DD) |
| `src/index.ts` | Barrel export |

Key types defined in `src/types/index.ts`:
- `ExtensionSettings` — `{ baseEmail: string }` stored in `chrome.storage.sync`
- `SubAddressResult` — result shape returned by `generateSubAddress`
- `ExtensionMessage`, `InsertEmailMessage`, `InsertEmailResponse` — message-passing types between popup, background, and content script

### `apps/extension`

Package name: `@subaddressify/extension`

| Path | Purpose |
|---|---|
| `src/background/index.ts` | Service worker — opens options page on first install |
| `src/content/index.ts` | Content script — detects email inputs, tracks focus, handles `INSERT_EMAIL` messages |
| `src/popup/popup.ts` | Popup UI logic — generates sub-address for current tab, copy/insert buttons |
| `src/options/` | Settings page — lets users configure their base email |
| `src/styles/main.css` | Global CSS (Tailwind) |
| `manifest.json` | Extension manifest (Manifest V3) |
| `scripts/zip-extension.mjs` | Packages the built extension into a ZIP for the Chrome Web Store |

Extension permissions: `activeTab`, `storage`, `scripting`, `host_permissions` (all HTTP/HTTPS URLs).

Build output: `apps/extension/dist/`  
Release ZIP output: `releases/`

### `apps/website`

Package name: `@subaddressify/website`

Next.js 15 marketing site using the App Router. Pages: `/` (landing) and `/privacy`. Update the `PLACEHOLDER_EXTENSION_ID` constant in `Hero.tsx`, `Nav.tsx`, and `CTA.tsx` once the extension is published to the Chrome Web Store.

---

## Tech Stack

| Tool | Version / Notes |
|---|---|
| TypeScript | 5.x, strict mode throughout |
| pnpm workspaces | 8+, monorepo management |
| Vite | 5.x, builds the Chrome extension |
| Next.js | 15, App Router, for the website |
| Tailwind CSS | 3.x, utility-first styling |
| Node.js | 18+ required |

---

## Common Commands

Run all commands from the **monorepo root** unless otherwise noted.

### Install dependencies
```bash
pnpm install
```

### Development
```bash
pnpm dev                  # Start all apps in parallel (watch mode)
pnpm dev:extension        # Extension only (Vite watch)
pnpm dev:website          # Website only (Next.js dev server on :3000)
```

### Build
```bash
pnpm build                # Build shared → extension → website (in order)
pnpm build:shared         # Build @subaddressify/shared only
pnpm build:extension      # Build extension only (output: apps/extension/dist/)
pnpm build:website        # Build website only
```

> **Important:** `@subaddressify/shared` must be built before `extension` or `website` because they consume its compiled output from `dist/`.

### Type checking
```bash
pnpm typecheck            # Run tsc --noEmit across all packages
```

### Linting
```bash
pnpm lint                 # Run ESLint across all packages
```

### Clean
```bash
pnpm clean                # Remove all dist/ directories and releases/
```

### Tests
```bash
pnpm test                 # Run tests across all packages (no tests exist yet)
```

### Packaging the extension
```bash
pnpm zip:extension        # Build + create releases/subaddressify-v<version>.zip
```

---

## Key Conventions

- **British spelling** is used in source code (e.g., `sanitiseHostname`, not `sanitizeHostname`).
- **No user data leaves the browser.** The base email is stored only in `chrome.storage.sync`. Nothing is sent to any server.
- All TypeScript is written in strict mode. Avoid `any`; use the types from `@subaddressify/shared`.
- **Message passing** between the popup and content script uses the typed `ExtensionMessage` union. Always use the defined types rather than ad-hoc objects.
- The content script supports React, Vue, and Angular controlled inputs by using the native `HTMLInputElement` value setter and dispatching `input`/`change` events after insertion.

---

## Chrome Extension Architecture

```
popup.ts  ──(chrome.tabs.sendMessage)──▶  content/index.ts
                                               │
                                         Inserts email
                                         into focused input

background/index.ts  ──  service worker, minimal logic
                          opens options page on first install
```

- The popup queries the active tab's hostname, generates a sub-address using `generateSubAddress` from `@subaddressify/shared`, then presents Copy and Insert buttons.
- The content script tracks which email input was last focused and responds to `INSERT_EMAIL` messages.
- Settings (base email) are read from and written to `chrome.storage.sync`.

---

## Chrome Web Store Publishing (CI/CD)

Set the following environment variables, then run the publish script:

| Variable | Description |
|---|---|
| `CHROME_EXTENSION_ID` | Extension ID from the Web Store dashboard |
| `CHROME_CLIENT_ID` | OAuth2 client ID (Google Cloud Console) |
| `CHROME_CLIENT_SECRET` | OAuth2 client secret |
| `CHROME_REFRESH_TOKEN` | OAuth2 refresh token for Web Store API |

```bash
node apps/extension/scripts/publish-extension.mjs
```

---

## Adding Features — Checklist

1. If adding shared logic (utilities, types), add it to `packages/shared/src/` and export from `src/index.ts`.
2. Rebuild shared before testing extension changes: `pnpm build:shared`.
3. Update `manifest.json` if new Chrome permissions are needed.
4. Run `pnpm typecheck` and `pnpm lint` before committing.
5. If the change affects the popup or content script, load the built extension in Chrome developer mode to verify.
