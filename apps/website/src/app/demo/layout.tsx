import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo — Subaddressify',
  description: 'Test the Subaddressify Chrome extension with sample signup forms.',
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
