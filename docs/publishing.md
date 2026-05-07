# Publishing the Chrome Extension

## One-time setup

### 1. Google Cloud credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com) → create or select a project
2. Enable the **Chrome Web Store API** under APIs & Services → Library
3. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: **Desktop app**
   - Note the **Client ID** and **Client secret**
4. Get a refresh token by running:
   ```bash
   npx chrome-webstore-upload-cli@3 fetch-token \
     --client-id YOUR_CLIENT_ID \
     --client-secret YOUR_CLIENT_SECRET
   ```
   Follow the browser prompt — it prints a refresh token when done.

### 2. GitHub secrets

In the repo: Settings → Secrets and variables → Actions → New repository secret

| Secret | Value |
|--------|-------|
| `CHROME_EXTENSION_ID` | The ID from your extension's Chrome Web Store URL |
| `CHROME_CLIENT_ID` | OAuth2 client ID from step 3 above |
| `CHROME_CLIENT_SECRET` | OAuth2 client secret from step 3 above |
| `CHROME_REFRESH_TOKEN` | Refresh token from step 4 above |

---

## Releasing a new version

```bash
# 1. Bump version, commit, and tag
node scripts/bump-version.mjs 1.2.0

# 2. Push — the tag triggers the publish workflow
git push --follow-tags
```

The GitHub Actions workflow will:
1. Verify the tag matches the version in `manifest.json`
2. Build and zip the extension
3. Upload and publish to the Chrome Web Store

The review process on Google's side typically takes 1–3 business days.
