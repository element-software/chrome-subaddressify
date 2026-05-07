/**
 * Background service worker for Subaddressify.
 * Handles extension lifecycle events and keeps logic minimal.
 */

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // Inject content script into tabs already open at install time
    const tabs = await chrome.tabs.query({ url: ['http://*/*', 'https://*/*'] });
    for (const tab of tabs) {
      if (tab.id) {
        chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] }).catch(() => {});
      }
    }
    chrome.runtime.openOptionsPage();
  }
});

// Keep the service worker alive while the popup is open
chrome.runtime.onConnect.addListener((_port) => {
  // Connection kept alive while popup is open
});
