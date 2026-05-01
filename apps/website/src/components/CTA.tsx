export function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-blue-950/50 to-gray-950 border border-blue-900/50 rounded-2xl p-10 sm:p-14">
          <h2 className="text-3xl font-bold text-gray-100 mb-4">
            Start using unique email addresses today
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Free, open source, and completely private. Add it to Chrome in seconds.
          </p>
          <a
            href="https://chrome.google.com/webstore/detail/PLACEHOLDER_EXTENSION_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-xl transition-colors"
          >
            Add to Chrome — It&#39;s Free
          </a>
          <p className="text-gray-600 text-xs mt-4">No account required · Open source · Privacy-first</p>
        </div>
      </div>
    </section>
  );
}
