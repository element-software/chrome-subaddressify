<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Subaddressify marketing website. Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new): Client-side PostHog initialization using Next.js 15.3+ `instrumentation-client` pattern. Configured with reverse proxy (`/ingest`), EU host, exception capture, and debug mode in development.
- **`next.config.mjs`**: Added rewrites for PostHog reverse proxy (`/ingest/*` → `https://eu.i.posthog.com/*`, `/ingest/static/*` and `/ingest/array/*` → `https://eu-assets.i.posthog.com/*`) and `skipTrailingSlashRedirect: true`.
- **`src/components/Hero.tsx`**: Made client component; added `add_to_chrome_clicked` capture with `location: 'hero'` on the primary CTA link.
- **`src/components/CTA.tsx`**: Made client component; added `add_to_chrome_clicked` capture with `location: 'cta'` on the bottom CTA link.
- **`src/components/Nav.tsx`**: Made client component; added `add_to_chrome_clicked` capture with `location: 'nav'` on the nav CTA link.
- **`src/app/demo/page.tsx`**: Added `newsletter_subscribed` capture on NewsletterForm submit; added `demo_signup_submitted` capture on SignupForm submit.
- **`src/components/CookieConsent.tsx`**: Added `cookie_consent_accepted` and `cookie_consent_declined` captures on the respective button handlers.
- **`.env`**: Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`package.json`**: Added `posthog-js` and `posthog-node` dependencies.

> **Action required**: Run `pnpm install` from the repository root to install the PostHog packages.

## Events

| Event | Description | File |
|-------|-------------|------|
| `add_to_chrome_clicked` | User clicks the 'Add to Chrome' button in the hero section | `src/components/Hero.tsx` |
| `add_to_chrome_clicked` | User clicks the 'Add to Chrome' button in the bottom CTA section | `src/components/CTA.tsx` |
| `add_to_chrome_clicked` | User clicks the 'Add to Chrome' button in the nav bar | `src/components/Nav.tsx` |
| `newsletter_subscribed` | User submits their email in the demo page newsletter form | `src/app/demo/page.tsx` |
| `demo_signup_submitted` | User completes and submits the demo account creation form | `src/app/demo/page.tsx` |
| `cookie_consent_accepted` | User accepts analytics cookies via the consent banner | `src/components/CookieConsent.tsx` |
| `cookie_consent_declined` | User declines analytics cookies via the consent banner | `src/components/CookieConsent.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/173790/dashboard/665050
- **Insight — Add to Chrome clicks over time**: https://eu.posthog.com/project/173790/insights/ojvrfpor
- **Insight — Chrome Web Store conversion funnel**: https://eu.posthog.com/project/173790/insights/S6WKMGi6
- **Insight — Cookie consent rate**: https://eu.posthog.com/project/173790/insights/S1IhMfsZ
- **Insight — Demo page engagement**: https://eu.posthog.com/project/173790/insights/W3FnfBs0
- **Insight — Best performing CTA location**: https://eu.posthog.com/project/173790/insights/OzAusT4o

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
