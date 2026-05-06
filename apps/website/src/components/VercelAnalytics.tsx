'use client';

import { Analytics } from '@vercel/analytics/react';

const STORAGE_KEY = 'cookie_consent';

export default function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (typeof window === 'undefined') return event;
        return localStorage.getItem(STORAGE_KEY) === 'granted' ? event : null;
      }}
    />
  );
}
