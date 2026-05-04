import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Features — Email Sub-addressing for Chrome',
  description:
    'Explore every feature of Subaddressify: one-click generation, auto-insert into forms, date-stamped addresses, cross-device sync, and full open-source transparency.',
  alternates: { canonical: '/features' },
  openGraph: {
    title: 'Subaddressify Features — Email Sub-addressing Chrome Extension',
    description:
      'One-click generation, auto-insert, date-stamped addresses, and more. See everything Subaddressify can do.',
    url: '/features',
  },
};

const features = [
  {
    icon: '⚡',
    title: 'One-click generation',
    summary: 'Your sub-address is ready before you even look for it.',
    detail:
      'The moment you open the Subaddressify popup on any page, a unique sub-address is already computed and displayed. No typing, no options to configure per-site — just click the extension icon and your address is ready to copy or insert.',
    benefit: 'Saves time on every sign-up, removing all friction from using a unique address.',
  },
  {
    icon: '🎯',
    title: 'Auto-insert into forms',
    summary: 'Click Insert and the address lands directly in the focused email field.',
    detail:
      'Subaddressify detects email input fields on the page using multiple signals: input type, name attribute, ID, and placeholder text. When you click Insert in the popup, the generated address is injected directly into the active field — no copy-paste required, no clipboard history left behind.',
    benefit: 'Works seamlessly on sign-up forms, newsletter fields, checkout pages, and more.',
  },
  {
    icon: '📅',
    title: 'Date-stamped addresses',
    summary: 'Every address includes the exact date you signed up.',
    detail:
      'Each generated sub-address embeds today\'s date in ISO format (YYYY-MM-DD). For example: you+2026-05-04-example-com@yourdomain.com. This means you can always tell exactly when you registered on a given site — useful for spotting old accounts or tracking data breaches.',
    benefit: 'Instantly know when your email was shared, even years later.',
  },
  {
    icon: '🌐',
    title: 'Works on any website',
    summary: 'No site-specific configuration needed.',
    detail:
      'Subaddressify reads the hostname of whatever page you\'re visiting and uses it to generate your sub-address. It works on every website — e-commerce checkouts, SaaS sign-ups, newsletters, forums, and more. No allow-list, no per-domain setup.',
    benefit: 'Install once and use everywhere, without thinking about it.',
  },
  {
    icon: '☁️',
    title: 'Syncs across devices',
    summary: 'Set your base email once — it follows your Chrome profile.',
    detail:
      'Your base email address is stored via chrome.storage.sync, which means it\'s tied to your signed-in Chrome profile. Sign in to Chrome on another computer and Subaddressify already knows your email. No account needed, no manual re-entry.',
    benefit: 'Consistent experience whether you\'re on your laptop, desktop, or work machine.',
  },
  {
    icon: '🔒',
    title: 'Completely private',
    summary: 'No servers. No tracking. No analytics.',
    detail:
      'Everything Subaddressify does happens locally in your browser. Your email address is never transmitted anywhere. Generated sub-addresses are computed on-device and not logged. There are no analytics, no telemetry, and no third-party services involved.',
    benefit: 'Your data stays yours — period.',
  },
  {
    icon: '🛠️',
    title: 'Open source',
    summary: 'Fully auditable. Nothing hidden.',
    detail:
      'The complete source code for Subaddressify is available on GitHub. You can read every line, verify the privacy claims, and build from source yourself. If you find an issue, open a pull request.',
    benefit: 'Trust is built on transparency, not promises.',
  },
  {
    icon: '📋',
    title: 'One-click clipboard copy',
    summary: 'Copy the sub-address to your clipboard in a single click.',
    detail:
      'If you prefer to paste manually — or if a site\'s email field isn\'t detected — the Copy button puts the address on your clipboard instantly. A visual confirmation confirms the copy succeeded.',
    benefit: 'Flexible for every workflow, even outside of form auto-insert.',
  },
];

const compatibilityProviders = [
  { name: 'Gmail', supported: true, notes: 'Full support. Emails to you+tag@gmail.com arrive in your Gmail inbox.' },
  { name: 'Outlook / Hotmail', supported: true, notes: 'Supported. Use filters in Outlook to sort by sub-address.' },
  { name: 'ProtonMail', supported: true, notes: 'Fully supported with built-in filter rules.' },
  { name: 'Fastmail', supported: true, notes: 'Full sub-addressing support with powerful rules.' },
  { name: 'Hey', supported: true, notes: 'Supported. Works with Hey\'s screening and labels.' },
  { name: 'iCloud Mail', supported: false, notes: 'iCloud does not support + sub-addressing.' },
  { name: 'Yahoo Mail', supported: false, notes: 'Does not support + sub-addressing.' },
];

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-blue-400 text-xs font-medium uppercase tracking-widest mb-3">Features</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-50 mb-4">
              Everything Subaddressify does
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Built to be simple, fast, and completely private. No accounts, no subscriptions,
              no servers — just smarter email addresses.
            </p>
          </div>

          <div className="space-y-6 mb-20">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-100 mb-1">{feature.title}</h2>
                    <p className="text-blue-400 text-sm mb-3">{feature.summary}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{feature.detail}</p>
                    <div className="inline-flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                      <span className="text-green-400 text-xs">✓</span>
                      <span className="text-gray-300 text-xs">{feature.benefit}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">Email provider compatibility</h2>
            <p className="text-gray-400 text-sm mb-6">
              Sub-addressing with the <code className="text-blue-400">+</code> symbol is a standard defined in{' '}
              <a href="https://datatracker.ietf.org/doc/html/rfc5233" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">RFC 5233</a>.
              Most modern email providers support it.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Supported</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {compatibilityProviders.map((p) => (
                    <tr key={p.name} className="border-b border-gray-800/50">
                      <td className="py-3 px-4 text-gray-200 font-medium">{p.name}</td>
                      <td className="py-3 px-4">
                        {p.supported
                          ? <span className="text-green-400 font-medium">Yes</span>
                          : <span className="text-red-400 font-medium">No</span>}
                      </td>
                      <td className="py-3 px-4 text-gray-400">{p.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-100 mb-3">Ready to take control of your inbox?</h2>
            <p className="text-gray-400 text-sm mb-6">Free, open source, and ready to install in seconds.</p>
            <a
              href="https://chrome.google.com/webstore/detail/kdmppldldoejpcacjjbjjcffpiodejco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Add to Chrome — It&apos;s Free
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
