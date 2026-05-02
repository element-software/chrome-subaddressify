/** The user's saved settings stored in chrome.storage.sync */
export interface ExtensionSettings {
  /** The base email address entered by the user, e.g. user@example.com */
  baseEmail: string;
  /** Whether to automatically fill detected email fields on signup/capture forms */
  autoFillEnabled: boolean;
  /** Whether to reuse the same alias for a domain across visits */
  reusePerDomain: boolean;
}

/** A stored alias entry for a given domain */
export interface AliasEntry {
  /** The full generated sub-address, e.g. user+2026-05-01-example-com@example.com */
  email: string;
  /** Unix timestamp (ms) when the alias was first created */
  createdAt: number;
}

/** Map of sanitised hostname → alias entry */
export type AliasMap = Record<string, AliasEntry>;

/** Result of generating a sub-address */
export interface SubAddressResult {
  /** The full generated sub-address, e.g. user+20260501-example-com@example.com */
  subAddress: string;
  /** The tag portion only, e.g. 20260501-example-com */
  tag: string;
  /** The sanitised hostname used to build the tag */
  sanitisedHostname: string;
  /** The date string used to build the tag, e.g. 20260501 */
  dateString: string;
}

/** Message types sent between popup, background, and content scripts */
export type MessageType =
  | 'INSERT_EMAIL'
  | 'GET_FOCUSED_FIELD'
  | 'PING';

/** A message sent via chrome.runtime.sendMessage or chrome.tabs.sendMessage */
export interface ExtensionMessage {
  type: MessageType;
  payload?: unknown;
}

/** Message to insert an email into the focused field */
export interface InsertEmailMessage extends ExtensionMessage {
  type: 'INSERT_EMAIL';
  payload: { email: string };
}

/** Response from content script after inserting an email */
export interface InsertEmailResponse {
  success: boolean;
  error?: string;
}
