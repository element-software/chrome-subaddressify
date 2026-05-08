const GITHUB_REPO_URL = 'https://github.com/element-software/chrome-subaddressify';

export function OpenSourceInvite() {
  return (
    <section className="py-16 px-4 border-y border-gray-800/80 bg-gray-950/40">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-gray-300 text-lg mb-6">
          Interested in seeing the code for this? Check out the{' '}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline transition-colors"
          >
            GitHub repo
          </a>
          .
        </p>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm font-medium transition-colors"
        >
          element-software/chrome-subaddressify
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
