const features = [
  {
    icon: '⚡',
    title: 'One-click generation',
    description: 'Open the popup, your unique sub-address is already generated and ready to copy or insert.',
  },
  {
    icon: '🎯',
    title: 'Auto-insert into forms',
    description: 'The extension detects focused email fields and inserts the address directly — no copy-paste needed.',
  },
  {
    icon: '📅',
    title: 'Date-stamped addresses',
    description: 'Every sub-address includes the current date, so you always know when you signed up somewhere.',
  },
  {
    icon: '🌐',
    title: 'Works on any website',
    description: 'Compatible with all websites. Detects email inputs by type, name, ID, and placeholder.',
  },
  {
    icon: '☁️',
    title: 'Syncs across devices',
    description: 'Your base email setting syncs with your Chrome profile across all your signed-in devices.',
  },
  {
    icon: '🛠️',
    title: 'Open source',
    description: 'The full source code is available on GitHub. Audit it yourself.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Features</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Built to be simple, fast, and completely private.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div key={feature.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="text-sm font-semibold text-gray-200 mb-1.5">{feature.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
