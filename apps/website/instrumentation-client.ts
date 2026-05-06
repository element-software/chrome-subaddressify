import posthog from 'posthog-js';

const STORAGE_KEY = 'cookie_consent';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: '/ingest',
  ui_host: 'https://eu.posthog.com',
  defaults: '2026-01-30',
  capture_exceptions: true,
  debug: process.env.NODE_ENV === 'development',
  opt_out_capturing_by_default: localStorage.getItem(STORAGE_KEY) !== 'granted',
});
