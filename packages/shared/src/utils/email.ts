import { formatDate } from './date';
import { sanitiseHostname } from './hostname';
import type { SubAddressResult } from '../types/index';

/**
 * Validates an email address using a standard regex.
 * Returns true if the email appears valid.
 */
export function validateEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  // RFC 5321 broadly compatible pattern
  const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return pattern.test(trimmed);
}

/**
 * Splits an email address into local part and domain.
 * Returns null if the email is invalid.
 */
export function splitEmail(email: string): { local: string; domain: string } | null {
  const trimmed = email.trim();
  const atIndex = trimmed.lastIndexOf('@');
  if (atIndex === -1) return null;
  return {
    local: trimmed.slice(0, atIndex),
    domain: trimmed.slice(atIndex + 1),
  };
}

/**
 * Generates a sub-addressed email based on the base email, hostname, and current date.
 *
 * Format: local+YYYYMMDD-sanitised-hostname@domain
 *
 * Example: user@example.com + example.com => user+20260501-example-com@example.com
 */
export function generateSubAddress(
  baseEmail: string,
  hostname: string,
  date: Date = new Date()
): SubAddressResult {
  const parts = splitEmail(baseEmail);
  if (!parts) {
    throw new Error(`Invalid base email: ${baseEmail}`);
  }

  const sanitisedHostname = sanitiseHostname(hostname);
  const dateString = formatDate(date);
  const tag = `${dateString}-${sanitisedHostname}`;
  const subAddress = `${parts.local}+${tag}@${parts.domain}`;

  return {
    subAddress,
    tag,
    sanitisedHostname,
    dateString,
  };
}
