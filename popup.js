document.getElementById('callApi').addEventListener('click', () => {
  const sessionId = document.getElementById('sessionId').value.trim();
  if (!sessionId) {
    alert("Enter your Salesforce session ID");
    return;
  }

  chrome.runtime.sendMessage({ action: 'fetchAccounts', sessionId }, (response) => {
    if (response.error) {
      document.getElementById('result').textContent = 'Error: ' + response.error;
    } else {
      document.getElementById('result').textContent = JSON.stringify(response.data, null, 2);
    }
  });
});
