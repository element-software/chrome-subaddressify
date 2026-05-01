/**
 * Background service worker for Email Subaddress Generator.
 * Handles extension lifecycle events and keeps logic minimal.
 */

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // Open the options page on first install so the user can configure their email
    chrome.runtime.openOptionsPage();
  }
});

// Keep the service worker alive while the popup is open
chrome.runtime.onConnect.addListener((_port) => {
  // Connection kept alive while popup is open
});
