import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'How It Works — Email Sub-addressing Explained',
  description:
    'Learn how email sub-addressing works with the + symbol, which email providers support it, how to set up inbox filters, and how to use Subaddressify to generate unique addresses automatically.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How Email Sub-addressing Works — Subaddressify',
    description:
      'A complete guide to email sub-addressing: the + symbol, provider support, inbox filters, and how Subaddressify automates the whole process.',
    url: '/how-it-works',
  },
};

const steps = [
  {
    number: '01',
    title: 'Install Subaddressify',
    detail:
      'Add the extension from the Chrome Web Store. On first launch, click the extension icon and open Settings to enter your real base email address. This is stored locally in your Chrome profile and synced across your signed-in devices.',
  },
  {
    number: '02',
    title: 'Visit any website',
    detail:
      'Navigate to any site where you need to provide an email address — a checkout, sign-up form, newsletter, or any registration flow. Click the Subaddressify icon in your Chrome toolbar.',
  },
  {
    number: '03',
    title: 'Your unique address is generated',
    detail:
      'The extension reads the current hostname and today\'s date and computes a unique sub-address in the format: localpart+YYYY-MM-DD-hostname-tld@domain.com. Everything is computed locally — no server calls.',
  },
  {
    number: '04',
    title: 'Copy or auto-insert',
    detail:
      'Click Copy to put the address on your clipboard, or click Insert to automatically fill the focused email field on the page. The address is ready to use immediately.',
  },
  {
    number: '05',
    title: 'Set up inbox filters',
    detail:
      'In your email client, create filters that match the sub-address pattern. Apply a label, route to a folder, or set up automatic deletion. Because each address encodes the site and date, your filters are precise and future-proof.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-blue-400 text-xs font-medium uppercase tracking-widest mb-3">How it works</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-50 mb-4">
              Email sub-addressing, explained
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Sub-addressing lets you create unlimited variations of your email address with no new accounts.
              Subaddressify automates the whole process.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 mb-12">
            <h2 className="text-sm font-semibold text-gray-300 mb-5">The anatomy of a sub-address</h2>
            <div className="font-mono text-sm overflow-x-auto mb-4">
              <div className="flex flex-wrap gap-1 items-center">
                <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded">you</span>
                <span className="text-gray-500">+</span>
                <span className="bg-blue-900/50 border border-blue-700/50 text-blue-300 px-2 py-1 rounded">2026-05-04</span>
                <span className="text-gray-500">-</span>
                <span className="bg-purple-900/50 border border-purple-700/50 text-purple-300 px-2 py-1 rounded">example-com</span>
                <span className="text-gray-500">@</span>
                <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded">yourdomain.com</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-200 font-medium mb-1">Local part</p>
                <p className="text-gray-400 text-xs">The part of your email before the @. Stays the same across all sub-addresses.</p>
              </div>
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3">
                <p className="text-blue-300 font-medium mb-1">Date stamp</p>
                <p className="text-gray-400 text-xs">Today&apos;s date in ISO format. Tells you exactly when you signed up on this site.</p>
              </div>
              <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3">
                <p className="text-purple-300 font-medium mb-1">Hostname</p>
                <p className="text-gray-400 text-xs">The domain of the site, formatted as slug. Uniquely identifies where you registered.</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-100 mb-8">Step by step</h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-5 bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="text-2xl font-bold text-blue-600/40 font-mono flex-shrink-0 w-8">{step.number}</div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-200 mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">How sub-addressing actually works</h2>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                Sub-addressing (also called plus addressing or tagged addressing) is defined in{' '}
                <a href="https://datatracker.ietf.org/doc/html/rfc5233" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">RFC 5233</a>.
                The email standard allows anything after a <code className="text-blue-400">+</code> in the local part of an address to be treated as a tag.
                Your mail server strips the tag and delivers the email to your main inbox.
              </p>
              <p>
                This means <code className="text-blue-400">you+2026-05-04-netflix-com@gmail.com</code> and <code className="text-blue-400">you@gmail.com</code> are the same
                destination. Gmail, Outlook, ProtonMail, and Fastmail all implement this natively. You can use any tag you like — Subaddressify just
                makes generating a consistent, meaningful tag automatic.
              </p>
              <p>
                Because the tag encodes the site and date, you can filter precisely. A Gmail filter on{' '}
                <code className="text-blue-400">to:you+*-netflix-com@gmail.com</code> catches all emails from Netflix registrations, regardless of when you signed up.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Setting up filters in Gmail</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <ol className="space-y-3 text-sm text-gray-400 list-decimal list-inside">
                <li>Open Gmail and click the search options icon (<span className="text-gray-200">⊞</span>) in the search bar.</li>
                <li>In the <span className="text-gray-200">To</span> field, enter your sub-address (e.g. <code className="text-blue-400">you+example-com@gmail.com</code>).</li>
                <li>Click <span className="text-gray-200">Create filter</span> at the bottom of the search panel.</li>
                <li>Choose what to do: apply a label, skip the inbox, mark as read, or forward elsewhere.</li>
                <li>Click <span className="text-gray-200">Create filter</span> to save. All existing and future emails matching that sub-address will be handled automatically.</li>
              </ol>
            </div>
          </div>

          <div className="text-center bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-100 mb-3">Start using smarter email addresses</h2>
            <p className="text-gray-400 text-sm mb-6">Free, takes 30 seconds to set up.</p>
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
