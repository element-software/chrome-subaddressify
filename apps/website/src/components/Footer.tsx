export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span className="w-5 h-5 bg-blue-600 rounded text-xs font-bold flex items-center justify-center">@</span>
          <span>Subaddressify</span>
        </div>
        <nav className="flex items-center gap-5 text-xs text-gray-500">
          <a href="#how-it-works" className="hover:text-gray-300 transition-colors">How it works</a>
          <a href="#features" className="hover:text-gray-300 transition-colors">Features</a>
          <a href="#faq" className="hover:text-gray-300 transition-colors">FAQ</a>
          <a href="/demo" className="hover:text-gray-300 transition-colors">Demo</a>
          <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <a
            href="https://github.com/element-software/chrome-subaddressify"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            GitHub
          </a>
        </nav>
        <p className="text-xs text-gray-600">
          © 2026 Subaddressify. Open source.
        </p>
      </div>
    </footer>
  );
}
