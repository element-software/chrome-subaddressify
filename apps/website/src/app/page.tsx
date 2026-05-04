import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { WhySubAddressing } from '@/components/WhySubAddressing';
import { PrivacyFirst } from '@/components/PrivacyFirst';
import { Features } from '@/components/Features';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Subaddressify — Email Sub-addressing Chrome Extension',
  description:
    'Generate unique, traceable email addresses for every website you sign up to. Use your existing Gmail, Outlook, or ProtonMail address — no new accounts needed. Free Chrome extension.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Subaddressify — Email Sub-addressing Chrome Extension',
    description:
      'Generate unique email addresses for every website. Filter spam, track leaks, and stay organised — no new accounts needed.',
    url: '/',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Subaddressify',
      url: 'https://subaddressify.com',
      description:
        'A Chrome extension that generates unique, traceable email sub-addresses for every website you sign up to. No new accounts needed.',
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Chrome',
      browserRequirements: 'Requires Google Chrome',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'One-click email sub-address generation',
        'Auto-insert into email form fields',
        'Date-stamped addresses per website',
        'Works with Gmail, Outlook, ProtonMail',
        'Chrome profile sync across devices',
        'Open source — fully auditable',
      ],
    },
    {
      '@type': 'Organization',
      name: 'Subaddressify',
      url: 'https://subaddressify.com',
      sameAs: ['https://github.com/element-software/chrome-subaddressify'],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <WhySubAddressing />
        <PrivacyFirst />
        <Features />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
