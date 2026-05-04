// @ts-ignore
import '../styles/main.css';
import { generateSubAddress, validateEmail, sanitiseHostname } from '@subaddressify/shared';
import type { ExtensionSettings, InsertEmailMessage, InsertEmailResponse } from '@subaddressify/shared';
import { saveAlias } from '../storage';

interface TabInfo {
  id: number;
  hostname: string;
}

async function getCurrentTab(): Promise<TabInfo | null> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.url) return null;
  try {
    const url = new URL(tab.url);
    return { id: tab.id, hostname: url.hostname };
  } catch {
    return null;
  }
}

async function getSettings(): Promise<ExtensionSettings | null> {
  const result = await chrome.storage.sync.get(['baseEmail', 'autoFillEnabled', 'reusePerDomain']);
  const baseEmail = result['baseEmail'] as string | undefined;
  if (!baseEmail) return null;

  const autoFillEnabled = (result['autoFillEnabled'] as boolean | undefined) ?? true;
  const reusePerDomain = (result['reusePerDomain'] as boolean | undefined) ?? true;

  return { baseEmail, autoFillEnabled, reusePerDomain };
}

async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

function renderNoEmail(app: HTMLElement): void {
  app.innerHTML = `
    <div class="p-4">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">@</div>
        <h1 class="text-sm font-semibold text-gray-100">Email Subaddress Generator</h1>
      </div>
      <div class="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 mb-3">
        <p class="text-yellow-300 text-xs font-medium mb-1">⚠️ No base email configured</p>
        <p class="text-yellow-400/80 text-xs">Please set your base email address in settings to generate sub-addresses.</p>
      </div>
      <button id="open-options" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors">
        Open Settings
      </button>
      <p class="text-gray-500 text-xs text-center mt-3">Your email is stored locally — never sent anywhere.</p>
    </div>
  `;
  document.getElementById('open-options')?.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}

function renderError(app: HTMLElement, message: string): void {
  app.innerHTML = `
    <div class="p-4">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">@</div>
        <h1 class="text-sm font-semibold text-gray-100">Email Subaddress Generator</h1>
      </div>
      <div class="bg-red-900/30 border border-red-700 rounded-lg p-3">
        <p class="text-red-300 text-xs">${message}</p>
      </div>
    </div>
  `;
}

async function insertEmailIntoTab(tabId: number, email: string): Promise<void> {
  const message: InsertEmailMessage = {
    type: 'INSERT_EMAIL',
    payload: { email },
  };
  try {
    const response = await chrome.tabs.sendMessage<InsertEmailMessage, InsertEmailResponse>(tabId, message);
    if (!response?.success) {
      console.warn('Insert failed:', response?.error);
    }
  } catch (err) {
    console.warn('Could not send message to content script:', err);
  }
}

function renderPopup(
  app: HTMLElement,
  hostname: string,
  subAddress: string,
  tabId: number
): void {
  app.innerHTML = `
    <div class="p-4">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">@</div>
        <h1 class="text-sm font-semibold text-gray-100">Email Subaddress Generator</h1>
      </div>

      <div class="bg-gray-800 rounded-lg p-3 mb-3">
        <p class="text-gray-400 text-xs mb-1">Current site</p>
        <p class="text-gray-200 text-xs font-mono truncate" title="${hostname}">${hostname}</p>
      </div>

      <div class="bg-gray-800 rounded-lg p-3 mb-3">
        <p class="text-gray-400 text-xs mb-1">Generated sub-address</p>
        <p class="text-blue-400 text-xs font-mono break-all" id="sub-address">${subAddress}</p>
      </div>

      <div class="flex gap-2 mb-3">
        <button
          id="copy-btn"
          class="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          <span id="copy-icon">📋</span>
          <span id="copy-text">Copy</span>
        </button>
        <button
          id="insert-btn"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          <span>✏️</span>
          <span id="insert-text">Insert</span>
        </button>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-gray-600 text-xs">Stored locally only.</p>
        <div class="flex gap-3">
          <button id="open-history" class="text-blue-500 hover:text-blue-400 text-xs transition-colors">History</button>
          <button id="open-options" class="text-blue-500 hover:text-blue-400 text-xs transition-colors">Settings</button>
        </div>
      </div>
    </div>
  `;

  const copyBtn = document.getElementById('copy-btn');
  const copyText = document.getElementById('copy-text');
  const copyIcon = document.getElementById('copy-icon');

  copyBtn?.addEventListener('click', async () => {
    await copyToClipboard(subAddress);
    saveAlias(sanitiseHostname(hostname), { email: subAddress, createdAt: Date.now() }).catch(() => {});
    if (copyText) copyText.textContent = 'Copied!';
    if (copyIcon) copyIcon.textContent = '✅';
    setTimeout(() => {
      if (copyText) copyText.textContent = 'Copy';
      if (copyIcon) copyIcon.textContent = '📋';
    }, 2000);
  });

  document.getElementById('insert-btn')?.addEventListener('click', async () => {
    const insertText = document.getElementById('insert-text');
    await insertEmailIntoTab(tabId, subAddress);
    saveAlias(sanitiseHostname(hostname), { email: subAddress, createdAt: Date.now() }).catch(() => {});
    if (insertText) insertText.textContent = 'Inserted!';
    setTimeout(() => {
      if (insertText) insertText.textContent = 'Insert';
    }, 2000);
  });

  document.getElementById('open-history')?.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('options.html') + '#history' });
  });

  document.getElementById('open-options')?.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}

async function init(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) return;

  const [tab, settings] = await Promise.all([getCurrentTab(), getSettings()]);

  if (!settings?.baseEmail || !validateEmail(settings.baseEmail)) {
    renderNoEmail(app);
    return;
  }

  if (!tab) {
    renderError(app, 'Could not detect the current tab. Try refreshing the page.');
    return;
  }

  try {
    const result = generateSubAddress(settings.baseEmail, tab.hostname);
    renderPopup(app, tab.hostname, result.subAddress, tab.id);
  } catch (err) {
    renderError(app, `Failed to generate sub-address: ${String(err)}`);
  }
}

init().catch(console.error);
