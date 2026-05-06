import type { Metadata } from 'next';
import CookieConsent from '@/components/CookieConsent';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://subaddressify.com'),
  title: {
    template: '%s | Subaddressify',
    default: 'Subaddressify — Email Sub-addressing Chrome Extension',
  },
  description:
    'Generate unique, traceable email addresses for every website you sign up to. Use Gmail, Outlook, or ProtonMail sub-addressing to filter spam, track leaks, and stay organised — no new accounts needed.',
  keywords: [
    'email subaddress',
    'plus addressing',
    'email sub-addressing',
    'email alias',
    'chrome extension',
    'email privacy',
    'email organisation',
    'gmail plus addressing',
    'spam filter email',
    'email tracking',
    'email generator chrome',
    'email privacy extension',
    'email leak tracker',
  ],
  authors: [{ name: 'Subaddressify' }],
  creator: 'Subaddressify',
  publisher: 'Subaddressify',
  icons: {
    icon: [{ url: '/icon128.png', sizes: '128x128', type: 'image/png' }],
    apple: [{ url: '/icon128.png', sizes: '128x128', type: 'image/png' }],
  },
  openGraph: {
    title: 'Subaddressify — Email Sub-addressing Chrome Extension',
    description:
      'Generate unique email addresses for every website. Filter spam, track leaks, and stay organised — no new accounts needed.',
    type: 'website',
    siteName: 'Subaddressify',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subaddressify — Email Sub-addressing Chrome Extension',
    description:
      'Generate unique email addresses for every website. Filter spam, track leaks, and stay organised — no new accounts needed.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <AnalyticsScripts />
      </head>
      <body className="bg-gray-950 text-gray-100 antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
