'use client';

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';

type ConsentState = 'granted' | 'denied' | null;

const STORAGE_KEY = 'cookie_consent';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

function updateGoogleConsent(state: 'granted' | 'denied') {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    analytics_storage: state,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export default function CookieConsent() {
  const [, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState;
    if (stored === 'granted' || stored === 'denied') {
      setConsent(stored);
      updateGoogleConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }

    return;
  }, [visible]);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'granted');
    setConsent('granted');
    setVisible(false);
    updateGoogleConsent('granted');
    posthog.opt_in_capturing();
    posthog.capture('cookie_consent_accepted');
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'denied');
    setConsent('denied');
    setVisible(false);
    updateGoogleConsent('denied');
    posthog.opt_out_capturing();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:p-6 backdrop-blur-sm bg-black/50"
    >
      <div className="w-full max-w-3xl rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-2xl sm:flex sm:items-center sm:gap-6">
        <p className="flex-1 text-sm text-gray-300">
          We use analytics cookies to understand how visitors use this site, which helps us improve
          it.{' '}
          <a href="/privacy" className="underline underline-offset-2 hover:text-white">
            Privacy policy
          </a>
          .
        </p>
        <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
          <button
            onClick={handleDecline}
            className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 transition hover:border-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
