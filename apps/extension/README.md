# Subaddressify — Chrome Extension

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
releases/subaddressify-v1.0.0.zip
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

#### Chrome Store Description
Subaddressify lets you create unique, site-specific email aliases with one click — no extra accounts needed.

BUT WHY you may ask?

When you give every website a unique address like you+amazon@gmail.com, the tag travels with every email that address receives — forever. That gives you two superpowers:

Tracing spam: if you start getting spam at you+somesite@gmail.com, you know exactly which site either sold your data or got scraped. No guessing. You can then filter or block that specific tag without touching your real address.                                    

Detecting data leaks: if a company suffers a breach and their database is sold or leaked, attackers will try the exposed addresses. When you get phishing or spam at you+companyx@gmail.com and Company X never sent you that kind of email before, it's a near-certain signal that address appeared in a breach — even before the company admits it publicly. You become your own early-warning system. 

Why it's better than reusing one address: with a single address, spam just arrives and you have no idea which of the dozens of sites you've signed up to is responsible. With subaddressing, every signup is individually tagged, so the source is always traceable.   

HOW IT WORKS
When you visit a site with an email field, the extension generates a sub-address in the format: you+20260504-example@yourdomain.com

Each address is tied to the site and the date, so you always know who shared your email — and you can filter or block it later.

FEATURES
  • Auto-detects email input fields on any page
  • One-click insert directly into the focused email field, or copy to clipboard
  • Remembers your preferred alias per domain (reuse or generate fresh)
  • Full alias history so you can look up what address you used on any site
  • Works entirely offline — no servers, no tracking, no data leaves your device
  • Configurable base email in the settings page

PRIVACY
The extension reads only the current page's hostname to generate the alias. It does not read page content, form data, or any other information. Nothing is sent to any server.

PERMISSIONS EXPLAINED
  • activeTab — to read the current site's hostname
  • storage — to save your base email and alias history locally
  • scripting — to detect and fill email input fields
  • host permissions — to run the content script on any site you visit

  
