import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://subaddressify.com'),
  title: 'Subaddressify — Chrome Extension',
  description:
    'Generate unique, traceable email variants per website. No accounts, no subscriptions. Privacy-first email organisation.',
  keywords: ['email subaddress', 'plus addressing', 'chrome extension', 'email privacy', 'email organisation'],
  openGraph: {
    title: 'Subaddressify',
    description: 'Generate unique email variants for every website. Filter, track, and block with ease.',
    type: 'website',
    siteName: 'Subaddressify',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subaddressify — Chrome Extension',
    description: 'Generate unique email variants for every website. Filter, track, and block with ease.',
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
      </head>
      <body className="bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  );
}
