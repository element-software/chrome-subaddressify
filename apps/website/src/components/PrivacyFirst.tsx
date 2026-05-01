export function PrivacyFirst() {
  return (
    <section id="privacy" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-900/50 border border-green-700/50 rounded-xl flex items-center justify-center text-lg">
              🔒
            </div>
            <h2 className="text-2xl font-bold text-gray-100">Privacy-first by design</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-3">What we store</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-400 mt-0.5">✓</span>
                  Your base email address — stored in Chrome&#39;s sync storage (local to your browser)
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-400 mt-0.5">✓</span>
                  That&#39;s it. Nothing else.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-3">What we don&#39;t do</h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Track your browsing history',
                  'Send data to any server',
                  'Use analytics or telemetry',
                  'Require an account or login',
                  'Store generated addresses',
                  'Show ads or sell data',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-400">
                    <span className="text-red-400 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 text-xs text-gray-400 leading-relaxed">
            <strong className="text-gray-300">Minimal permissions:</strong> The extension only requests{' '}
            <code className="text-blue-400">activeTab</code>,{' '}
            <code className="text-blue-400">storage</code>, and{' '}
            <code className="text-blue-400">scripting</code> — the bare minimum needed to generate and insert sub-addresses.
          </div>
        </div>
      </div>
    </section>
  );
}
