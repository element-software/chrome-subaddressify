const steps = [
  {
    number: '01',
    title: 'Install the extension',
    description:
      'Add the extension from the Chrome Web Store. On first launch, enter your real email address in the settings page.',
  },
  {
    number: '02',
    title: 'Visit any website',
    description:
      "Click the extension icon on any page. It automatically reads the current hostname and today's date.",
  },
  {
    number: '03',
    title: 'Copy or insert the sub-address',
    description:
      'The extension generates a unique sub-address. Copy it to clipboard or click "Insert" to fill the focused email field directly.',
  },
  {
    number: '04',
    title: 'Filter and organise your inbox',
    description:
      "Use your email client's filtering rules to automatically label, folder, or block emails by sub-address.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-100 mb-3">How it works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Sub-addressing uses the <code className="text-blue-400">+</code> symbol supported by most email providers — Gmail, Outlook, ProtonMail, and more.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-3xl font-bold text-blue-600/30 mb-3 font-mono">{step.number}</div>
              <h3 className="text-sm font-semibold text-gray-200 mb-2">{step.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Example sub-address breakdown</h3>
          <div className="font-mono text-sm overflow-x-auto">
            <div className="flex flex-wrap gap-1 items-center">
              <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded">you</span>
              <span className="text-gray-500">+</span>
              <span className="bg-blue-900/50 border border-blue-700/50 text-blue-300 px-2 py-1 rounded">2026-05-01</span>
              <span className="text-gray-500">-</span>
              <span className="bg-purple-900/50 border border-purple-700/50 text-purple-300 px-2 py-1 rounded">example-com</span>
              <span className="text-gray-500">@</span>
              <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded">yourdomain.com</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
            <span><span className="text-gray-200">you</span> → your local email part</span>
            <span><span className="text-blue-300">2026-05-01</span> → sign-up date</span>
            <span><span className="text-purple-300">example-com</span> → website hostname</span>
          </div>
        </div>
      </div>
    </section>
  );
}
