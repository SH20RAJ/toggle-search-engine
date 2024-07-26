const engines = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    yahoo: 'https://search.yahoo.com/search?p=',
    baidu: 'https://www.baidu.com/s?wd=',
    yandex: 'https://yandex.com/search/?text='
  };
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleEngine') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab && tab.url && tab.id) {
          const currentUrl = new URL(tab.url);
          const query = currentUrl.searchParams.get('q');
          let newUrl = '';
  
          if (tab.url.includes('google.com/search')) {
            newUrl = engines['bing'] + query;
          } else if (tab.url.includes('bing.com/search')) {
            newUrl = engines['google'] + query;
          } else if (tab.url.includes('duckduckgo.com')) {
            newUrl = engines['yahoo'] + query;
          } else if (tab.url.includes('yahoo.com/search')) {
            newUrl = engines['baidu'] + query;
          } else if (tab.url.includes('baidu.com/s')) {
            newUrl = engines['yandex'] + query;
          } else if (tab.url.includes('yandex.com/search')) {
            newUrl = engines['google'] + query;
          }
  
          if (newUrl) {
            chrome.tabs.update(tab.id, { url: newUrl });
          }
        }
      });
    }
  });