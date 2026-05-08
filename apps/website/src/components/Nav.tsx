'use client';

import posthog from 'posthog-js';

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-gray-100 hover:text-white transition-colors">
          <span className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-xs font-bold">@</span>
          <span className="text-sm font-semibold">Subaddressify</span>
        </a>
        <div className="flex items-center gap-5">
          <a href="/how-it-works" className="text-gray-400 hover:text-gray-200 text-sm transition-colors hidden sm:block">How it works</a>
          <a href="/features" className="text-gray-400 hover:text-gray-200 text-sm transition-colors hidden sm:block">Features</a>
          <a href="/faq" className="text-gray-400 hover:text-gray-200 text-sm transition-colors hidden sm:block">FAQ</a>
          <a href="/demo" className="text-gray-400 hover:text-gray-200 text-sm transition-colors hidden sm:block">Demo</a>
          <a
            href="https://github.com/element-software/chrome-subaddressify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Subaddressify on GitHub"
          >
            <svg className="w-5 h-5 sm:hidden" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="hidden sm:inline text-sm transition-colors">GitHub</span>
          </a>
          <a
            href="https://chrome.google.com/webstore/detail/kdmppldldoejpcacjjbjjcffpiodejco"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            onClick={() => posthog.capture('add_to_chrome_clicked', { location: 'nav' })}
          >
            Add to Chrome
          </a>
        </div>
      </div>
    </nav>
  );
}
