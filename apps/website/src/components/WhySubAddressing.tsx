const benefits = [
  {
    icon: '🔍',
    title: 'Know exactly where your email was shared',
    description:
      'Each sub-address is tied to a specific website and date. If you start receiving spam at user+2026-05-01-shoppingsite-com@domain.com, you know exactly where it came from.',
  },
  {
    icon: '📁',
    title: 'Effortless inbox filtering',
    description:
      'Create rules in Gmail, Outlook, or ProtonMail to automatically label or organise emails by sub-address. No more manual sorting.',
  },
  {
    icon: '🛡️',
    title: 'Easy blocking if an address leaks',
    description:
      "If a sub-address starts receiving unwanted emails, block it without affecting your main inbox or creating a new email account.",
  },
  {
    icon: '🚫',
    title: 'No accounts. No subscriptions.',
    description:
      "Everything runs in your browser. There's no sign-up, no server, no SaaS. Your base email never leaves your device.",
  },
];

export function WhySubAddressing() {
  return (
    <section id="why" className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Why use sub-addressing?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Most people use the same email address everywhere. Sub-addressing gives you control — one inbox, infinite unique variants.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-2xl mb-3">{benefit.icon}</div>
              <h3 className="text-sm font-semibold text-gray-200 mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
