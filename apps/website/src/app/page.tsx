import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { WhySubAddressing } from '@/components/WhySubAddressing';
import { PrivacyFirst } from '@/components/PrivacyFirst';
import { Features } from '@/components/Features';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';

export default function Home() {
  return (
    <>
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
