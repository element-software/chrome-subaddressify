import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FAQ — Email Sub-addressing Questions Answered',
  description:
    'Answers to common questions about email sub-addressing with Subaddressify: Gmail compatibility, spam prevention, privacy, + symbol support, and how to set up inbox filters.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Subaddressify FAQ — Email Sub-addressing Questions Answered',
    description:
      'Does plus addressing work with Gmail? Will it stop spam? Is my email safe? All your questions answered.',
    url: '/faq',
  },
};

const faqs = [
  {
    question: 'What is email sub-addressing?',
    answer:
      'Email sub-addressing (also called plus addressing or tagged addressing) is a technique that lets you create variations of your email address by appending a + and a tag. For example, if your address is you@gmail.com, you can use you+tag@gmail.com. Emails sent to any variation arrive in the same inbox. It\'s defined in RFC 5233 and supported by most modern email providers.',
  },
  {
    question: 'Does sub-addressing work with my email provider?',
    answer:
      'Sub-addressing using the + symbol is supported by Gmail, Outlook, ProtonMail, Fastmail, and Hey. iCloud Mail and Yahoo Mail do not support it. A small number of websites may also incorrectly reject email addresses containing a + character — in those cases, use your base address directly.',
  },
  {
    question: 'Will using a sub-address prevent spam?',
    answer:
      'Sub-addressing doesn\'t prevent spam outright, but it lets you identify exactly where spam came from and filter it automatically. If you signed up to example.com with you+2026-01-01-example-com@yourdomain.com and start receiving spam there, you know example.com shared or leaked your address. You can then create a filter to automatically delete or archive anything sent to that sub-address.',
  },
  {
    question: 'Is my base email address safe?',
    answer:
      'Yes. Your base email is stored using Chrome\'s built-in sync storage (chrome.storage.sync) — it lives in your browser profile and is never transmitted to any external server. Sub-addresses are computed locally using the current hostname and date; nothing is logged or recorded by the extension.',
  },
  {
    question: 'Can I use this with Gmail?',
    answer:
      'Yes. Gmail natively supports sub-addressing. Emails sent to you+tag@gmail.com arrive in your main Gmail inbox. To organise them, create a Gmail filter using the "To" field: set it to match your sub-address (e.g. to:you+example-com), then choose an action like "Apply label" or "Skip the inbox".',
  },
  {
    question: "What if a website doesn't accept + in email addresses?",
    answer:
      'Some websites incorrectly validate email addresses and reject the + character, even though it is perfectly valid per RFC 5322. In those cases, use your base email directly. The extension won\'t cause any issues — simply don\'t use the generated address for that site. This is unfortunately a bug in the website\'s validation, not a limitation of sub-addressing.',
  },
  {
    question: 'Do I need to create a new email account?',
    answer:
      'No. Sub-addressing works with your existing email address. All emails to any sub-address arrive in the same inbox. No new accounts, no forwarding rules needed at the provider level. You only need filters if you want to automatically sort incoming mail.',
  },
  {
    question: 'How do I set up filters to sort emails by sub-address?',
    answer:
      'In Gmail: go to Settings → Filters and Blocked Addresses → Create a new filter. In the "To" field, enter your sub-address (e.g. you+example-com@gmail.com). Choose an action — apply a label, skip the inbox, delete, or forward. In Outlook: go to Settings → Mail → Rules → Add new rule, then filter by "Recipient address contains" your sub-address.',
  },
  {
    question: 'Can I tell who leaked or sold my email?',
    answer:
      'Yes — that\'s one of the most powerful uses of sub-addressing. Because each sub-address is tied to a specific website and date (e.g. you+2026-01-15-retailer-com@yourdomain.com), any spam arriving at that address tells you exactly which site your email came from and approximately when it was shared. This works for data breaches too.',
  },
  {
    question: 'Does the extension store which sites I visit?',
    answer:
      'No. The extension reads the current page hostname only when you open the popup — it is not monitoring your browsing in the background. The hostname is used immediately to generate the sub-address and is not stored or logged anywhere.',
  },
  {
    question: 'Can I customise the format of the generated address?',
    answer:
      'The current format is fixed: localpart+DATE-HOSTNAME@domain.com. This standardised format makes it easy to build consistent filters and keeps things simple. Custom format support may be added in a future release — follow the GitHub repository for updates.',
  },
  {
    question: 'Is Subaddressify free?',
    answer:
      'Yes, completely free. There are no paid tiers, no subscriptions, and no premium features. The extension is also open source, so you can inspect the code, fork it, or contribute improvements.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Nav />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-blue-400 text-xs font-medium uppercase tracking-widest mb-3">FAQ</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-50 mb-4">
              Frequently asked questions
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Everything you need to know about email sub-addressing and how Subaddressify works.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-base font-semibold text-gray-100 mb-3">{faq.question}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <p className="text-gray-400 text-sm mb-2">Still have questions?</p>
            <a
              href="https://github.com/element-software/chrome-subaddressify"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Open an issue on GitHub →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
