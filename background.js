let engines = ['google', 'bing']; // Default search engines
let currentEngineIndex = 0;

chrome.storage.sync.get(['engines'], (result) => {
  if (result.engines) {
    engines = result.engines;
  }
});

chrome.action.onClicked.addListener((tab) => {
  const currentUrl = new URL(tab.url);
  const query = currentUrl.searchParams.get('q');
  let newUrl = '';

  if (currentUrl.hostname.includes('google.com') || currentUrl.hostname.includes('bing.com')) {
    currentEngineIndex = (currentEngineIndex + 1) % engines.length;
  } else {
    currentEngineIndex = 0;
  }

  const engine = engines[currentEngineIndex];
  switch (engine) {
    case 'google':
      newUrl = `https://www.google.com/search?q=${query}`;
      break;
    case 'bing':
      newUrl = `https://www.bing.com/search?q=${query}`;
      break;
    // Add more cases here for other search engines
  }

  if (newUrl) {
    chrome.tabs.update(tab.id, { url: newUrl });
  }
});
