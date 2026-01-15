import { myInstanceUrl } from "./env.js";

document.getElementById('callApi').addEventListener('click', () => {
  console.log("Cookie");

  chrome.cookies.get({
    url: myInstanceUrl, // Must be a full URL
    name: 'sid'
  }, (cookie) => {

    if (cookie) {
      console.log(`Found cookie:`, cookie.value);

      let sessionId = cookie.value;
      chrome.runtime.sendMessage({ action: 'fetchAccounts', sessionId }, (response) => {
        if (response.error) {
          document.getElementById('result').textContent = 'Error: ' + response.error;
        } else {
          document.getElementById('result').textContent = JSON.stringify(response.data, null, 2);
        }
      });

    } else {
      console.log(`Cookie not found.`);
    }
  });
});