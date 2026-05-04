import '../styles/main.css';
import { validateEmail, formatDateDisplay } from '@subaddressify/shared';
import { getSettings, saveSettings, getAllAliases, deleteAlias } from '../storage';
import type { ExtensionSettings, AliasMap } from '@subaddressify/shared';

type Tab = 'settings' | 'history';

function getActiveTab(): Tab {
  return location.hash === '#history' ? 'history' : 'settings';
}

function renderTabNav(activeTab: Tab): string {
  const base = 'flex-1 text-xs font-medium py-1.5 px-3 rounded-md transition-colors';
  const active = 'bg-gray-700 text-gray-100';
  const inactive = 'text-gray-400 hover:text-gray-200';
  return `
    <div class="flex gap-1 mb-6 bg-gray-800 rounded-lg p-1">
      <button id="tab-settings" class="${base} ${activeTab === 'settings' ? active : inactive}">Settings</button>
      <button id="tab-history" class="${base} ${activeTab === 'history' ? active : inactive}">Alias History</button>
    </div>
  `;
}

function renderSettingsContent(current: ExtensionSettings): string {
  return `
    <div id="pane-settings">
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
          value="${current.baseEmail}"
          class="w-full bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 transition-colors"
          autocomplete="email"
        />
        <p id="email-error" class="text-red-400 text-xs mt-1 hidden">Please enter a valid email address.</p>
      </div>

      <div class="bg-gray-800 rounded-xl p-5 mb-5">
        <h2 class="text-sm font-semibold text-gray-200 mb-4">Autofill Behaviour</h2>

        <label class="flex items-start gap-3 cursor-pointer mb-4">
          <input
            id="autofill-enabled"
            type="checkbox"
            ${current.autoFillEnabled ? 'checked' : ''}
            class="mt-0.5 w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 cursor-pointer"
          />
          <div>
            <p class="text-sm font-medium text-gray-200">Auto-fill email fields</p>
            <p class="text-xs text-gray-400 mt-0.5">
              Automatically insert your sub-address into signup and email capture forms when you focus the field.
              Login forms are never auto-filled.
            </p>
          </div>
        </label>

        <label class="flex items-start gap-3 cursor-pointer">
          <input
            id="reuse-per-domain"
            type="checkbox"
            ${current.reusePerDomain ? 'checked' : ''}
            class="mt-0.5 w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 cursor-pointer"
          />
          <div>
            <p class="text-sm font-medium text-gray-200">Remember alias per domain</p>
            <p class="text-xs text-gray-400 mt-0.5">
              Reuse the same sub-address on repeat visits to the same site, so your alias stays consistent.
            </p>
          </div>
        </label>
      </div>

      <button
        id="save-btn"
        class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors"
      >
        Save Settings
      </button>

      <div id="save-success" class="hidden mt-3 bg-green-900/30 border border-green-700 rounded-lg p-3">
        <p class="text-green-300 text-xs">Settings saved successfully.</p>
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
          <code class="text-blue-400 text-xs">you+2026-05-01-example-com@yourdomain.com</code>
        </div>
        <p class="text-gray-400 text-xs leading-relaxed">
          This makes it easy to filter, track, and block emails per website — without creating new accounts.
        </p>
      </div>

      <div class="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mt-4">
        <p class="text-gray-500 text-xs">
          <strong class="text-gray-400">Privacy note:</strong> Your base email and aliases are stored locally using Chrome's sync storage.
          Nothing is ever sent to any server, and the extension does not track your browsing.
        </p>
      </div>
    </div>
  `;
}

function renderAliasRows(aliases: AliasMap, query: string): string {
  const entries = Object.entries(aliases)
    .filter(([hostname]) => hostname.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b[1].createdAt - a[1].createdAt);

  if (entries.length === 0) {
    return `
      <div class="text-center py-10">
        <p class="text-gray-500 text-sm">${query ? 'No aliases match your search.' : 'No aliases saved yet.'}</p>
        ${!query ? '<p class="text-gray-600 text-xs mt-1">Aliases are saved when you auto-fill or copy a sub-address.</p>' : ''}
      </div>
    `;
  }

  return entries.map(([hostname, entry]) => {
    const date = formatDateDisplay(new Date(entry.createdAt));
    const escapedEmail = entry.email.replace(/"/g, '&quot;');
    const escapedHostname = hostname.replace(/"/g, '&quot;');
    return `
      <div class="bg-gray-800 rounded-lg p-3 flex items-start gap-3 group" data-hostname="${escapedHostname}">
        <div class="flex-1 min-w-0">
          <p class="text-gray-200 text-xs font-medium truncate">${hostname}</p>
          <p class="text-blue-400 text-xs font-mono break-all mt-0.5">${entry.email}</p>
          <p class="text-gray-500 text-xs mt-1">${date}</p>
        </div>
        <div class="flex gap-1.5 flex-shrink-0 mt-0.5">
          <button
            class="copy-alias-btn text-gray-400 hover:text-gray-200 text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            data-email="${escapedEmail}"
            title="Copy alias"
          >Copy</button>
          <a
            href="https://${hostname}"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-gray-200 text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            title="Open site"
          >↗</a>
          <button
            class="delete-alias-btn text-gray-600 hover:text-red-400 text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            data-hostname="${escapedHostname}"
            title="Delete alias"
          >✕</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderHistoryContent(aliases: AliasMap): string {
  const count = Object.keys(aliases).length;
  return `
    <div id="pane-history">
      <div class="flex items-center justify-between mb-3">
        <p class="text-gray-400 text-xs">${count} alias${count !== 1 ? 'es' : ''} saved</p>
      </div>
      <input
        id="history-search"
        type="text"
        placeholder="Filter by domain…"
        class="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 transition-colors mb-4"
      />
      <div id="alias-list" class="flex flex-col gap-2">
        ${renderAliasRows(aliases, '')}
      </div>
    </div>
  `;
}

function attachSettingsListeners(app: HTMLElement): void {
  const emailInput = app.querySelector<HTMLInputElement>('#base-email')!;
  const autofillCheckbox = app.querySelector<HTMLInputElement>('#autofill-enabled')!;
  const reuseCheckbox = app.querySelector<HTMLInputElement>('#reuse-per-domain')!;
  const saveBtn = app.querySelector<HTMLButtonElement>('#save-btn')!;
  const emailError = app.querySelector('#email-error');
  const saveSuccess = app.querySelector('#save-success');

  saveBtn.addEventListener('click', async () => {
    const baseEmail = emailInput.value.trim();
    emailError?.classList.add('hidden');
    saveSuccess?.classList.add('hidden');

    if (!validateEmail(baseEmail)) {
      emailError?.classList.remove('hidden');
      return;
    }

    saveBtn.disabled = true;
    try {
      await saveSettings({
        baseEmail,
        autoFillEnabled: autofillCheckbox.checked,
        reusePerDomain: reuseCheckbox.checked,
      });
      saveSuccess?.classList.remove('hidden');
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      saveBtn.disabled = false;
    }
  });
}

function attachHistoryListeners(app: HTMLElement, aliases: AliasMap): void {
  const searchInput = app.querySelector<HTMLInputElement>('#history-search')!;
  const aliasList = app.querySelector<HTMLElement>('#alias-list')!;

  searchInput.addEventListener('input', () => {
    aliasList.innerHTML = renderAliasRows(aliases, searchInput.value);
    attachAliasRowListeners(aliasList, aliases);
  });

  attachAliasRowListeners(aliasList, aliases);
}

function attachAliasRowListeners(container: HTMLElement, aliases: AliasMap): void {
  container.querySelectorAll<HTMLButtonElement>('.copy-alias-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset['email'] ?? '';
      await navigator.clipboard.writeText(email);
      const prev = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = prev; }, 2000);
    });
  });

  container.querySelectorAll<HTMLButtonElement>('.delete-alias-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const hostname = btn.dataset['hostname'] ?? '';
      await deleteAlias(hostname);
      delete aliases[hostname];
      const row = btn.closest<HTMLElement>('[data-hostname]');
      row?.remove();
      const count = Object.keys(aliases).length;
      const countEl = document.querySelector('#pane-history > p');
      if (countEl) countEl.textContent = `${count} alias${count !== 1 ? 'es' : ''} saved`;
      if (count === 0) {
        container.innerHTML = renderAliasRows(aliases, '');
      }
    });
  });
}

async function render(app: HTMLElement): Promise<void> {
  const [settings, aliases] = await Promise.all([getSettings(), getAllAliases()]);
  const activeTab = getActiveTab();

  app.innerHTML = `
    <div class="max-w-lg mx-auto p-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">@</div>
        <div>
          <h1 class="text-lg font-semibold text-gray-100">Subaddressify</h1>
          <p class="text-gray-400 text-sm">${activeTab === 'history' ? 'Alias History' : 'Settings'}</p>
        </div>
      </div>
      ${renderTabNav(activeTab)}
      ${activeTab === 'settings' ? renderSettingsContent(settings) : renderHistoryContent(aliases)}
    </div>
  `;

  if (activeTab === 'settings') {
    attachSettingsListeners(app);
  } else {
    attachHistoryListeners(app, aliases);
  }

  app.querySelector('#tab-settings')?.addEventListener('click', () => {
    location.hash = '';
    render(app);
  });
  app.querySelector('#tab-history')?.addEventListener('click', () => {
    location.hash = '#history';
    render(app);
  });
}

async function init(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;
  await render(app);

  window.addEventListener('hashchange', () => render(app));
}

init().catch(console.error);
