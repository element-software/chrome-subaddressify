export type FormClassification = 'login' | 'signup' | 'standalone';

const LOGIN_KEYWORDS = ['login', 'log in', 'log-in', 'sign in', 'sign-in'];
const SIGNUP_KEYWORDS = [
  'sign up', 'sign-up', 'signup',
  'register', 'registration',
  'create account', 'create your account', 'create a free account',
  'get started', 'join now', 'join free', 'join today',
];

function hasPasswordField(root: Element): boolean {
  return root.querySelector('input[type="password"]') !== null;
}

function collectText(root: Element): string {
  const parts: string[] = [];

  root.querySelectorAll('button, input[type="submit"], input[type="button"]').forEach((el) => {
    parts.push(el.textContent ?? '');
    if (el instanceof HTMLInputElement) parts.push(el.value);
    parts.push(el.getAttribute('aria-label') ?? '');
  });

  root.querySelectorAll('h1, h2, h3, [role="heading"]').forEach((el) => {
    parts.push(el.textContent ?? '');
  });

  if (root instanceof HTMLFormElement) {
    parts.push(root.getAttribute('aria-label') ?? '');
    parts.push(root.id);
    parts.push(root.className);
  }

  return parts.join(' ').toLowerCase();
}

/**
 * Classifies the form context around an email input.
 *
 * Returns:
 * - 'standalone' — no password field (email capture, newsletter, etc.)
 * - 'signup'     — password field present and signup keywords found
 * - 'login'      — password field present without clear signup signal
 */
export function classifyForm(input: HTMLInputElement): FormClassification {
  const form = input.closest('form');
  const root: Element =
    form ??
    input.closest('section, main, [role="main"], [role="dialog"]') ??
    document.body;

  if (!hasPasswordField(root)) return 'standalone';

  const text = collectText(root);
  const hasSignup = SIGNUP_KEYWORDS.some((kw) => text.includes(kw));
  const hasLogin = LOGIN_KEYWORDS.some((kw) => text.includes(kw));

  if (hasSignup && !hasLogin) return 'signup';

  // Ambiguous (both signals, or neither) → conservative: treat as login
  return 'login';
}
