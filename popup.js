document.getElementById('toggleButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.url.includes('google.com/search')) {
        const query = new URL(tab.url).searchParams.get('q');
        chrome.tabs.update(tab.id, { url: `https://www.bing.com/search?q=${query}` });
      } else if (tab.url.includes('bing.com/search')) {
        const query = new URL(tab.url).searchParams.get('q');
        chrome.tabs.update(tab.id, { url: `https://www.google.com/search?q=${query}` });
      }
    });
  });
  