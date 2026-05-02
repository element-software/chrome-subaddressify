import type { AliasEntry, AliasMap, ExtensionSettings } from '@subaddressify/shared';

const DEFAULTS: ExtensionSettings = {
  baseEmail: '',
  autoFillEnabled: true,
  reusePerDomain: true,
};

export async function getSettings(): Promise<ExtensionSettings> {
  const result = await chrome.storage.sync.get(['baseEmail', 'autoFillEnabled', 'reusePerDomain']);
  return {
    baseEmail: (result['baseEmail'] as string | undefined) ?? DEFAULTS.baseEmail,
    autoFillEnabled: (result['autoFillEnabled'] as boolean | undefined) ?? DEFAULTS.autoFillEnabled,
    reusePerDomain: (result['reusePerDomain'] as boolean | undefined) ?? DEFAULTS.reusePerDomain,
  };
}

export async function saveSettings(settings: Partial<ExtensionSettings>): Promise<void> {
  await chrome.storage.sync.set(settings);
}

export async function getAlias(hostname: string): Promise<AliasEntry | undefined> {
  const result = await chrome.storage.sync.get('aliases');
  const aliases = (result['aliases'] as AliasMap | undefined) ?? {};
  return aliases[hostname];
}

export async function saveAlias(hostname: string, entry: AliasEntry): Promise<void> {
  const result = await chrome.storage.sync.get('aliases');
  const aliases = (result['aliases'] as AliasMap | undefined) ?? {};
  aliases[hostname] = entry;
  await chrome.storage.sync.set({ aliases });
}

export async function getAllAliases(): Promise<AliasMap> {
  const result = await chrome.storage.sync.get('aliases');
  return (result['aliases'] as AliasMap | undefined) ?? {};
}
