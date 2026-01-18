import { myInstanceUrl } from "./env.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchAccounts') {
    const sessionId = message.sessionId;
    const instanceUrl = myInstanceUrl.instanceUrl; // replace with your instance
    let logId = '07LGB00005gX7p3';
    fetch(`${instanceUrl}/services/data/v64.0/sobjects/ApexLog/${logId}/Body`, {
      headers: {
        'Authorization': 'Bearer ' + sessionId
        //'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(data => {
        const regex = /HEAP_ALLOCATE\|\[\d+\]\|Bytes:\d+/g;
        data = data.match(regex) || [];
        sendResponse({ data })
    })
    .catch(err => sendResponse({ error: err.message }));

    // keep the message channel open for async response
    return true;
  }
});

function extractHeapAllocateLines(logText) {
  const regex = /^HEAP_ALLOCATE\|\[\d+\]\|Bytes:\d+/gm;
  return logText.match(regex) || [];
}