export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-gray-100 hover:text-white transition-colors">
          <span className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-xs font-bold">@</span>
          <span className="text-sm font-semibold">Subaddressify</span>
        </a>
        <div className="flex items-center gap-5">
          <a href="#how-it-works" className="text-gray-400 hover:text-gray-200 text-sm transition-colors hidden sm:block">How it works</a>
          <a href="#features" className="text-gray-400 hover:text-gray-200 text-sm transition-colors hidden sm:block">Features</a>
          <a href="#faq" className="text-gray-400 hover:text-gray-200 text-sm transition-colors hidden sm:block">FAQ</a>
          <a href="/demo" className="text-gray-400 hover:text-gray-200 text-sm transition-colors hidden sm:block">Demo</a>
          <a
            href="https://chrome.google.com/webstore/detail/PLACEHOLDER_EXTENSION_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Add to Chrome
          </a>
        </div>
      </div>
    </nav>
  );
}
