export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-800/50 rounded-full px-4 py-1.5 text-blue-400 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
          Free Chrome Extension · No Account Required
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-50 leading-tight mb-6">
          A unique email address
          <br />
          <span className="text-blue-500">for every website</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          Automatically generate sub-addressed email variants based on where you sign up.
          Filter, track, and stay organised — without creating new accounts.
        </p>

        <div className="inline-block bg-gray-900 border border-gray-700 rounded-xl px-5 py-3 mb-10">
          <code className="text-blue-400 text-sm sm:text-base font-mono">
            you+20260501-example-com@yourdomain.com
          </code>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://chrome.google.com/webstore/detail/PLACEHOLDER_EXTENSION_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
            Add to Chrome — It&#39;s Free
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm transition-colors"
          >
            See how it works
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        <p className="text-gray-600 text-xs mt-6">
          Your email is stored in your browser only. Never sent anywhere.
        </p>
      </div>
    </section>
  );
}
