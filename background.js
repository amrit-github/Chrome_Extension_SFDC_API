import { myInstanceUrl } from "./env.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchAccounts') {
    const sessionId = message.sessionId;
    const instanceUrl = myInstanceUrl; // replace with your instance

    fetch(`${instanceUrl}/services/data/v57.0/query/?q=SELECT+Id,Name+FROM+Account+LIMIT+5`, {
      headers: {
        'Authorization': 'Bearer ' + sessionId,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => sendResponse({ data }))
    .catch(err => sendResponse({ error: err.message }));

    // keep the message channel open for async response
    return true;
  }
});