import { myInstanceUrl } from "./env.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === 'fetchAccounts') {
    const sessionId = message.sessionId;
    const instanceUrl = myInstanceUrl.instanceUrl; // replace with your instance
    fetch(`${instanceUrl}/services/data/v64.0/query/?q=SELECT+Id,Name+FROM+Account+LIMIT+5`, {
      headers: {
        'Authorization': 'Bearer ' + sessionId,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(data => {sendResponse({ data })
    })
    .catch(err => sendResponse({ error: err.message }));

    return true;
  }
});