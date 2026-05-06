import type { InsertEmailMessage, InsertEmailResponse, ExtensionMessage } from '@subaddressify/shared';
import { generateSubAddress, sanitiseHostname } from '@subaddressify/shared';
import { getSettings, getAlias, saveAlias } from '../storage';
import { classifyForm } from './formDetection';

const EMAIL_SELECTORS = [
  'input[type="email"]',
  'input[name*="email" i]',
  'input[id*="email" i]',
  'input[placeholder*="email" i]',
  'input[autocomplete="email"]',
  'input[autocomplete="username"]',
];

let lastFocusedEmailInput: HTMLInputElement | null = null;

/**
 * Tracks inputs we have auto-filled and the exact value we set.
 * Used to detect user edits (we bail out if input.value !== our fill).
 */
const autofilledValues = new WeakMap<HTMLInputElement, string>();

function isEmailInput(element: Element): element is HTMLInputElement {
  if (!(element instanceof HTMLInputElement)) return false;
  return EMAIL_SELECTORS.some((selector) => element.matches(selector));
}

/** Insert a value and fire framework-compatible events (React, Vue, Next.js) */
function insertValueIntoInput(input: HTMLInputElement, value: string): void {
  input.focus();
  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set;
  if (nativeSetter) {
    nativeSetter.call(input, value);
  } else {
    input.value = value;
  }
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

async function performAutofill(input: HTMLInputElement): Promise<void> {
  // If we previously filled this input and the user has since edited it, respect their edit
  const previousFill = autofilledValues.get(input);
  if (previousFill !== undefined && input.value !== previousFill) return;

  // Don't overwrite a value the page pre-populated (and we haven't touched)
  if (input.value !== '' && previousFill === undefined) return;

  const settings = await getSettings();
  if (!settings.autoFillEnabled || !settings.baseEmail) return;

  const classification = classifyForm(input);
  if (classification === 'login') return;

  const hostname = window.location.hostname;
  const sanitised = sanitiseHostname(hostname);

  let email: string;

  if (settings.reusePerDomain) {
    const existing = await getAlias(hostname);
    if (existing) {
      email = existing.email;
    } else {
      const result = generateSubAddress(settings.baseEmail, hostname);
      email = result.subAddress;
      await saveAlias(hostname, { email, createdAt: Date.now(), originalHostname: hostname });
    }
  } else {
    const result = generateSubAddress(settings.baseEmail, hostname);
    email = result.subAddress;
    // Store even in non-reuse mode so the popup and options page can display it
    await saveAlias(sanitised, { email, createdAt: Date.now(), originalHostname: hostname });
  }

  insertValueIntoInput(input, email);
  autofilledValues.set(input, email);
}

function findFirstEmailInput(): HTMLInputElement | null {
  for (const selector of EMAIL_SELECTORS) {
    const el = document.querySelector(selector);
    if (el instanceof HTMLInputElement) return el;
  }
  return null;
}

// Event delegation: single listener on document for all focusin events
document.addEventListener(
  'focusin',
  (event) => {
    const target = event.target as Element;
    if (!isEmailInput(target)) return;

    lastFocusedEmailInput = target;
    performAutofill(target).catch(() => {
      // Silently swallow errors — content scripts must not throw unhandled rejections
    });
  },
  true
);

// Message handler for popup-initiated insertions
chrome.runtime.onMessage.addListener(
  (
    message: ExtensionMessage,
    _sender,
    sendResponse: (response: InsertEmailResponse) => void
  ) => {
    if (message.type === 'INSERT_EMAIL') {
      const insertMsg = message as InsertEmailMessage;
      const payload = insertMsg.payload;
      const email =
        typeof payload === 'object' && payload !== null && 'email' in payload
          ? (payload as { email: string }).email
          : undefined;

      if (!email) {
        sendResponse({ success: false, error: 'No email provided' });
        return true;
      }

      const target = lastFocusedEmailInput ?? findFirstEmailInput();

      if (!target) {
        sendResponse({ success: false, error: 'No email input found on this page' });
        return true;
      }

      try {
        insertValueIntoInput(target, email);
        autofilledValues.set(target, email);
        const hostname = sanitiseHostname(window.location.hostname);
        saveAlias(hostname, { email, createdAt: Date.now(), originalHostname: window.location.hostname }).catch(() => {});
        sendResponse({ success: true });
      } catch (err) {
        sendResponse({ success: false, error: String(err) });
      }
      return true;
    }

    if (message.type === 'PING') {
      sendResponse({ success: true });
      return true;
    }

    return false;
  }
);
