import '../styles/main.css';
import { validateEmail } from '@subaddressify/shared';

async function loadSettings(): Promise<string> {
  const result = await chrome.storage.sync.get('baseEmail');
  return (result['baseEmail'] as string | undefined) ?? '';
}

async function saveSettings(baseEmail: string): Promise<void> {
  await chrome.storage.sync.set({ baseEmail });
}

function renderOptions(app: HTMLElement, currentEmail: string): void {
  app.innerHTML = `
    <div class="max-w-lg mx-auto p-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">@</div>
        <div>
          <h1 class="text-lg font-semibold text-gray-100">Email Subaddress Generator</h1>
          <p class="text-gray-400 text-sm">Settings</p>
        </div>
      </div>

      <div class="bg-gray-800 rounded-xl p-5 mb-5">
        <h2 class="text-sm font-semibold text-gray-200 mb-1">Base Email Address</h2>
        <p class="text-gray-400 text-xs mb-4">
          Enter your real email address. The extension will generate a unique sub-address for every website you visit.
        </p>
        <label for="base-email" class="block text-xs text-gray-400 mb-1">Your email address</label>
        <input
          id="base-email"
          type="email"
          placeholder="you@example.com"
          value="${currentEmail}"
          class="w-full bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 transition-colors"
          autocomplete="email"
        />
        <p id="email-error" class="text-red-400 text-xs mt-1 hidden">Please enter a valid email address.</p>
      </div>

      <button
        id="save-btn"
        class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors"
      >
        Save Settings
      </button>

      <div id="save-success" class="hidden mt-3 bg-green-900/30 border border-green-700 rounded-lg p-3">
        <p class="text-green-300 text-xs">✅ Settings saved successfully.</p>
      </div>

      <div class="bg-gray-800/50 rounded-xl p-5 mt-6">
        <h2 class="text-sm font-semibold text-gray-300 mb-2">What is sub-addressing?</h2>
        <p class="text-gray-400 text-xs leading-relaxed mb-3">
          Sub-addressing (also called plus addressing) lets you create unique email variants using the <code class="text-blue-400 bg-gray-700 px-1 rounded">+</code> symbol,
          supported by most email providers including Gmail, Outlook, and ProtonMail.
        </p>
        <p class="text-gray-400 text-xs leading-relaxed mb-3">
          This extension generates addresses like:
        </p>
        <div class="bg-gray-700 rounded-lg px-3 py-2 mb-3">
          <code class="text-blue-400 text-xs">you+20260501-example-com@yourdomain.com</code>
        </div>
        <p class="text-gray-400 text-xs leading-relaxed">
          This makes it easy to filter, track, and block emails per website — without creating new accounts.
        </p>
      </div>

      <div class="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mt-4">
        <p class="text-gray-500 text-xs">
          🔒 <strong class="text-gray-400">Privacy note:</strong> Your base email is stored locally using Chrome's sync storage.
          It is never sent to any server, and the extension does not track your browsing.
        </p>
      </div>
    </div>
  `;

  const emailInput = document.getElementById('base-email') as HTMLInputElement;
  const saveBtn = document.getElementById('save-btn') as HTMLButtonElement;
  const emailError = document.getElementById('email-error');
  const saveSuccess = document.getElementById('save-success');

  saveBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    emailError?.classList.add('hidden');
    saveSuccess?.classList.add('hidden');

    if (!validateEmail(email)) {
      emailError?.classList.remove('hidden');
      return;
    }

    saveBtn.disabled = true;
    try {
      await saveSettings(email);
      saveSuccess?.classList.remove('hidden');
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      saveBtn.disabled = false;
    }
  });
}

async function init(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;
  const currentEmail = await loadSettings();
  renderOptions(app, currentEmail);
}

init().catch(console.error);
