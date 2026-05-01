# Email Subaddress Generator

A Chrome extension that automatically generates sub-addressed email addresses for any website you visit.

## What is sub-addressing?

Sub-addressing (also called plus addressing) lets you create unique email variants using the `+` symbol:

```
user+20260501-example-com@domain.com
```

This helps you:
- Track where your email address was used
- Filter emails by source
- Quickly block if an address leaks
- Stay organised — no extra accounts needed

## Project Structure

```
chrome-subaddressify/
├── apps/
│   ├── extension/     # Chrome extension (Manifest V3)
│   └── website/       # Marketing website (Next.js)
├── packages/
│   └── shared/        # Shared utilities and types
├── package.json
└── pnpm-workspace.yaml
```

## Tech Stack

- **TypeScript** — strict mode throughout
- **Tailwind CSS** — utility-first styling
- **pnpm workspaces** — monorepo management
- **Vite** — extension build tool
- **Next.js** — website framework

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

```bash
npm install -g pnpm
```

### Install dependencies

```bash
pnpm install
```

### Development

```bash
# Start all apps
pnpm dev

# Start only the extension dev build
pnpm dev:extension

# Start only the website
pnpm dev:website
```

### Build

```bash
# Build everything
pnpm build

# Build only the extension
pnpm build:extension

# Build only the website
pnpm build:website
```

### Type checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

### Clean all build outputs

```bash
pnpm clean
```

## Chrome Extension

See [apps/extension/README.md](apps/extension/README.md) for:
- Extension installation (developer mode)
- Build and packaging instructions
- Chrome Web Store publishing

## Marketing Website

See [apps/website/README.md](apps/website/README.md) for:
- Local development
- Deployment instructions