let currentEngine = 'google'; // Default search engine is Google

chrome.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  const query = url.searchParams.get('q');
  let newUrl = '';

  if (url.hostname.includes('google.com')) {
    newUrl = `https://www.bing.com/search?q=${query}`;
    currentEngine = 'bing';
  } else if (url.hostname.includes('bing.com')) {
    newUrl = `https://www.google.com/search?q=${query}`;
    currentEngine = 'google';
  } else if (currentEngine === 'google') {
    newUrl = `https://www.bing.com/search?q=${query}`;
    currentEngine = 'bing';
  } else {
    newUrl = `https://www.google.com/search?q=${query}`;
    currentEngine = 'google';
  }

  chrome.tabs.update(tab.id, { url: newUrl });
});
