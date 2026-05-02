'use client';

import { useState } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

type FormState = 'idle' | 'submitted';

function NewsletterForm() {
  const [state, setState] = useState<FormState>('idle');
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmittedEmail(email);
    setState('submitted');
  }

  if (state === 'submitted') {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-200 text-sm font-medium mb-1">You&apos;re on the list!</p>
        <p className="text-gray-500 text-xs mb-3">Subscribed as:</p>
        <code className="text-blue-400 text-xs font-mono bg-gray-800 px-3 py-1.5 rounded-lg break-all">{submittedEmail}</code>
        <button
          onClick={() => { setState('idle'); setEmail(''); setSubmittedEmail(''); }}
          className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="newsletter-email" className="block text-xs font-medium text-gray-400 mb-1.5">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder-gray-600 transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
      >
        Subscribe
      </button>
      <p className="text-gray-600 text-xs text-center">No spam. Unsubscribe any time.</p>
    </form>
  );
}

function SignupForm() {
  const [state, setState] = useState<FormState>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !name) return;
    setSubmittedEmail(email);
    setState('submitted');
  }

  if (state === 'submitted') {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-200 text-sm font-medium mb-1">Account created!</p>
        <p className="text-gray-500 text-xs mb-3">Registered as:</p>
        <code className="text-blue-400 text-xs font-mono bg-gray-800 px-3 py-1.5 rounded-lg break-all">{submittedEmail}</code>
        <button
          onClick={() => { setState('idle'); setEmail(''); setName(''); setSubmittedEmail(''); }}
          className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="signup-name" className="block text-xs font-medium text-gray-400 mb-1.5">
          Full name
        </label>
        <input
          id="signup-name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Jane Smith"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder-gray-600 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="signup-email" className="block text-xs font-medium text-gray-400 mb-1.5">
          Email address
        </label>
        <input
          id="signup-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder-gray-600 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="signup-password" className="block text-xs font-medium text-gray-400 mb-1.5">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          name="new-password"
          autoComplete="new-password"
          placeholder="••••••••"
          className="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder-gray-600 transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
      >
        Create account
      </button>
      <p className="text-gray-600 text-xs text-center">
        By signing up you agree to our{' '}
        <span className="text-gray-500 cursor-default">Terms of Service</span>.
      </p>
    </form>
  );
}

function LoginForm() {
  const [state, setState] = useState<FormState>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitted');
  }

  if (state === 'submitted') {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-10 h-10 rounded-full bg-gray-700/50 border border-gray-600 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p className="text-gray-200 text-sm font-medium mb-1">Signed in.</p>
        <p className="text-gray-500 text-xs mt-1 max-w-[200px]">
          Did the extension fill this form? It shouldn&apos;t — login forms are intentionally skipped.
        </p>
        <button
          onClick={() => setState('idle')}
          className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="block text-xs font-medium text-gray-400 mb-1.5">
          Email address
        </label>
        <input
          id="login-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder-gray-600 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-xs font-medium text-gray-400 mb-1.5">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          name="current-password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder-gray-600 transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium py-2.5 rounded-lg transition-colors"
      >
        Sign in
      </button>
    </form>
  );
}

const steps = [
  {
    n: '1',
    title: 'Install the extension',
    body: 'Add Subaddressify to Chrome from the Web Store and configure your base email in the extension settings.',
  },
  {
    n: '2',
    title: 'Click into an email field',
    body: 'Focus any email input below. If auto-fill is on, the extension injects your sub-address automatically.',
  },
  {
    n: '3',
    title: 'Or use the popup',
    body: 'Open the extension popup, then click Insert to fill the focused field — or Copy to paste it yourself.',
  },
  {
    n: '4',
    title: 'Submit the form',
    body: 'The success screen shows exactly which address was used, so you can verify the alias is correct.',
  },
];

export default function DemoPage() {
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto px-4 pt-28 pb-24">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 text-xs font-medium">Extension demo</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">Test the extension</h1>
          <p className="text-gray-400 text-base max-w-xl">
            Use these sample forms to see Subaddressify in action. Each form simulates a real signup scenario — watch the extension auto-fill a unique sub-address as you click into the email fields.
          </p>
        </div>

        {/* How to use */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-12">
          <h2 className="text-sm font-semibold text-gray-200 mb-5">How to use this page</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {steps.map(step => (
              <div key={step.n} className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-semibold mt-0.5">
                  {step.n}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-200">{step.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo forms */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Newsletter */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="border-b border-gray-800 px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xs">✉</span>
                <span className="text-xs font-semibold text-gray-300">Acme Newsletter</span>
              </div>
              <p className="text-gray-600 text-xs">Single email field — the simplest case</p>
            </div>
            <div className="px-5 py-5">
              <p className="text-gray-300 text-sm font-medium mb-1">Stay in the loop</p>
              <p className="text-gray-500 text-xs mb-5">Get product updates and early access.</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Full signup */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden ring-1 ring-blue-500/20">
            <div className="border-b border-gray-800 px-5 py-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs">N</span>
                  <span className="text-xs font-semibold text-gray-300">Nexus Cloud</span>
                </div>
                <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-2 py-0.5">Try this one</span>
              </div>
              <p className="text-gray-600 text-xs">Full registration form with password field</p>
            </div>
            <div className="px-5 py-5">
              <p className="text-gray-300 text-sm font-medium mb-1">Create your account</p>
              <p className="text-gray-500 text-xs mb-5">Start your 14-day free trial. No card required.</p>
              <SignupForm />
            </div>
          </div>

          {/* Login */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="border-b border-gray-800 px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded bg-gray-700 border border-gray-600 flex items-center justify-center text-gray-400 text-xs">N</span>
                <span className="text-xs font-semibold text-gray-300">Nexus Cloud</span>
              </div>
              <p className="text-gray-600 text-xs">Login form — extension should skip this</p>
            </div>
            <div className="px-5 py-5">
              <p className="text-gray-300 text-sm font-medium mb-1">Sign in</p>
              <p className="text-gray-500 text-xs mb-5">Welcome back.</p>
              <LoginForm />
            </div>
          </div>

        </div>

        {/* Note */}
        <div className="mt-8 bg-gray-900/50 border border-gray-800/50 rounded-xl p-5 flex gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed">
            These forms are for demonstration only — nothing is stored or submitted anywhere.
            The sub-addresses generated here are based on this site&apos;s hostname, so they&apos;ll look like{' '}
            <code className="text-blue-400/80 font-mono">you+2026-05-02-subaddressify-co-uk@domain.com</code>.
            On any real website the hostname changes, giving you a unique alias per site.
          </p>
        </div>

      </main>
      <Footer />
    </>
  );
}

