document.getElementById('toggleButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.runtime.sendMessage({ action: 'toggleEngine', url: tab.url });
    });
  });
  