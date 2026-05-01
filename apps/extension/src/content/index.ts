import type { InsertEmailMessage, InsertEmailResponse, ExtensionMessage } from '@subaddressify/shared';

/** Email input selectors — fields that are likely email inputs */
const EMAIL_SELECTORS = [
  'input[type="email"]',
  'input[name*="email" i]',
  'input[id*="email" i]',
  'input[placeholder*="email" i]',
  'input[autocomplete="email"]',
  'input[autocomplete="username"]',
];

let lastFocusedEmailInput: HTMLInputElement | null = null;

/** Insert a value into an input field and trigger React/Vue/Angular change events */
function insertValueIntoInput(input: HTMLInputElement, value: string): void {
  input.focus();
  // Use native input setter to work with React controlled inputs
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set;
  if (nativeInputValueSetter) {
    nativeInputValueSetter.call(input, value);
  } else {
    input.value = value;
  }
  // Trigger events so frameworks update their state
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

/** Check if a given element is an email input */
function isEmailInput(element: Element): element is HTMLInputElement {
  if (!(element instanceof HTMLInputElement)) return false;
  return EMAIL_SELECTORS.some((selector) => element.matches(selector));
}

/** Track the last focused email input on the page */
function setupFocusTracking(): void {
  document.addEventListener(
    'focusin',
    (event) => {
      const target = event.target as Element;
      if (isEmailInput(target)) {
        lastFocusedEmailInput = target as HTMLInputElement;
      }
    },
    true
  );
}

/** Find the first email input on the page */
function findFirstEmailInput(): HTMLInputElement | null {
  for (const selector of EMAIL_SELECTORS) {
    const el = document.querySelector(selector);
    if (el instanceof HTMLInputElement) return el;
  }
  return null;
}

/** Message handler for messages from the popup */
chrome.runtime.onMessage.addListener(
  (
    message: ExtensionMessage,
    _sender,
    sendResponse: (response: InsertEmailResponse) => void
  ) => {
    if (message.type === 'INSERT_EMAIL') {
      const insertMsg = message as InsertEmailMessage;
      const email = (insertMsg.payload as { email: string } | undefined)?.email;

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

setupFocusTracking();
