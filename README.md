# Salesforce API Caller (Chrome Extension)

Small Chrome extension that reads the Salesforce session cookie and calls a Salesforce REST query from a background service worker.

Files
- [manifest.json](manifest.json) — extension manifest (MV3).
- [popup.html](popup.html) — popup UI with the [`callApi` button id](popup.html).
- [popup.js](popup.js) — popup logic that reads the `sid` cookie via [`chrome.cookies.get`](popup.js) and sends a message with action [`fetchAccounts`](background.js).
- [background.js](background.js) — service worker that listens via [`chrome.runtime.onMessage.addListener`](background.js) and performs the fetch to the Salesforce REST endpoint.

Quick install (unpacked)
1. Open Chrome and go to chrome://extensions
2. Enable "Developer mode"
3. Click "Load unpacked" and select this project folder (the folder containing [manifest.json](manifest.json))

Usage
1. Click the extension action to open the popup ([popup.html](popup.html)).
2. Click "Fetch Accounts" (button id [`callApi`](popup.html)).
3. The popup reads the Salesforce session cookie (`sid`) via [`chrome.cookies.get`](popup.js) and sends the session ID to the background service worker using the `fetchAccounts` message action ([background.js](background.js)).
4. The background worker calls the REST API and returns results to the popup.

Configurable items
- Salesforce instance URL and SOQL are in [background.js](background.js):
  - Change `instanceUrl` to point to your org.
  - Adjust the query path (`/services/data/v57.0/query/?q=...`) as needed.
- Cookie name is `sid` in [popup.js](popup.js). Update if your org uses a different cookie.

Permissions and security
- Declared permissions are in [manifest.json](manifest.json). The extension needs `cookies` and host access (`"https://*.salesforce.com/*"`) to read the session cookie and call the API.
- Keep your extension code secure: avoid logging session IDs to public logs and do not expose the extension package.

Troubleshooting
- If the popup reports "Cookie not found", ensure you are logged into the target Salesforce instance in the browser and the extension has host permissions for that origin ([manifest.json](manifest.json)).
- Inspect the background service worker for fetch errors via chrome://extensions → "Service worker" (Inspect) for [background.js](background.js).
- If the API returns an auth error, verify the `sid` cookie is valid and that CORS is not required because the background worker performs the fetch.

Notes
- This project uses Manifest V3 with a service worker background script ([manifest.json](manifest.json) -> `background.service_worker`).
- Designed for development and testing only. For production consider OAuth flows and least-privilege design.

License
- No license file included. Add one if you intend to share