import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="max-w-7xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: May 2026</p>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Overview</h2>
            <p>
              Subaddressify is designed with your privacy in mind. The extension does not collect,
              transmit, or store any personal data on external servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Data we store</h2>
            <p>The only data stored by the extension is your <strong>base email address</strong>, which you enter in the settings page.</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Stored using <code className="text-blue-400">chrome.storage.sync</code> — local to your browser and synced across your Chrome profile</li>
              <li>Never transmitted to any external server</li>
              <li>Can be cleared at any time from the extension settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Data we do NOT collect</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Browsing history</li>
              <li>Websites you visit</li>
              <li>Generated email addresses</li>
              <li>Form data or input content</li>
              <li>Usage analytics or telemetry</li>
              <li>Device or browser fingerprint</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Permissions</h2>
            <p>The extension requests the following Chrome permissions:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li><strong className="text-gray-300">activeTab</strong> — to read the hostname of the current page and generate the sub-address</li>
              <li><strong className="text-gray-300">storage</strong> — to save your base email address locally</li>
              <li><strong className="text-gray-300">scripting</strong> — to detect email input fields and insert the generated address</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Third-party services</h2>
            <p>
              This extension does not use any third-party services, analytics platforms, or advertising networks.
              No data leaves your device.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Contact</h2>
            <p>
              If you have questions about this privacy policy, please open an issue on the project&#39;s GitHub repository.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
