# Email Subaddress Generator — Chrome Extension

A Chrome extension (Manifest V3) that generates unique sub-addressed email variants for every website you visit.

## Features

- Detects email input fields automatically
- Generates sub-addresses in the format: `user+YYYYMMDD-hostname@domain.com`
- Copy to clipboard or insert directly into the focused email field
- Popup UI with current hostname and generated address
- Settings page to configure your base email
- Works entirely offline — no data sent anywhere

## Development

### Prerequisites

```bash
npm install -g pnpm
pnpm install
```

### Local development (watch mode)

```bash
pnpm dev:extension
```

This builds the extension in watch mode. Each save triggers a rebuild.

### Build for production

```bash
pnpm build:extension
```

Output is in `apps/extension/dist/`.

### Add icons

Place icon files in `apps/extension/src/icons/`:
- `icon16.png`
- `icon32.png`
- `icon48.png`
- `icon128.png`

---

## Installing in Developer Mode

1. Build the extension: `pnpm build:extension`
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked**
5. Select the `apps/extension/dist/` folder

The extension icon should now appear in your toolbar.

---

## Packaging for Chrome Web Store

### Create a ZIP

```bash
pnpm zip:extension
```

This builds the extension and creates a ZIP in the `releases/` directory:
```
releases/email-subaddress-generator-v1.0.0.zip
```

### Submit to Chrome Web Store

1. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Upload the ZIP from `releases/`
3. Fill in store listing details
4. Submit for review

---

## Publishing via API (CI/CD)

Set these environment variables:

| Variable | Description |
|---|---|
| `CHROME_EXTENSION_ID` | Your extension ID from the Web Store dashboard |
| `CHROME_CLIENT_ID` | OAuth2 client ID (Google Cloud Console) |
| `CHROME_CLIENT_SECRET` | OAuth2 client secret |
| `CHROME_REFRESH_TOKEN` | OAuth2 refresh token for Web Store API |

Then run:

```bash
node apps/extension/scripts/publish-extension.mjs
```

---

## Permissions

| Permission | Reason |
|---|---|
| `activeTab` | Read the current page's hostname for sub-address generation |
| `storage` | Store the user's base email using Chrome sync storage |
| `scripting` | Inject the content script when needed |
| `host_permissions` | Allow the content script to detect email fields on all sites |

> The extension does **not** read page content beyond detecting email inputs. No user data is sent anywhere.
